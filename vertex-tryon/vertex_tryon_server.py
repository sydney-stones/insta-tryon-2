"""
Vertex AI Virtual Try-On API Server
Provides HTTP endpoints for virtual try-on using Google's Vertex AI
"""

import os
import io
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from google import genai
from google.genai.types import RecontextImageSource, ProductImage

app = Flask(__name__)
CORS(app)

# Initialize Gen AI client
client = None

def initialize_client():
    """Initialize the Gen AI client with Vertex AI"""
    global client

    if client is not None:
        return

    # Set environment variables for Vertex AI
    # These should be set before running the server
    project = os.environ.get('GOOGLE_CLOUD_PROJECT')
    location = os.environ.get('GOOGLE_CLOUD_LOCATION', 'global')

    if not project:
        raise ValueError("GOOGLE_CLOUD_PROJECT environment variable must be set")

    os.environ['GOOGLE_GENAI_USE_VERTEXAI'] = 'True'

    client = genai.Client()
    print(f"✅ Gen AI client initialized for project: {project}, location: {location}")


def base64_to_pil(base64_string):
    """Convert base64 string to PIL Image"""
    # Remove data URL prefix if present
    if ',' in base64_string:
        base64_string = base64_string.split(',')[1]

    image_bytes = base64.b64decode(base64_string)
    return Image.open(io.BytesIO(image_bytes))


def pil_to_base64(pil_image):
    """Convert PIL Image to base64 string"""
    buffered = io.BytesIO()
    pil_image.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode('utf-8')


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        initialize_client()
        return jsonify({
            "status": "ok",
            "service": "Vertex AI Virtual Try-On",
            "model": "virtual-try-on-preview-08-04"
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": str(e)
        }), 500


@app.route('/tryon', methods=['POST'])
def virtual_tryon():
    """
    Virtual try-on endpoint

    Expected JSON body:
    {
        "person_image": "base64_encoded_image",
        "garment_image": "base64_encoded_image"
    }

    Returns:
    {
        "success": true,
        "result_image": "base64_encoded_image",
        "bytes_used": 1234567
    }
    """
    try:
        initialize_client()

        data = request.get_json()

        if not data or 'person_image' not in data or 'garment_image' not in data:
            return jsonify({
                "success": False,
                "error": "Missing required fields: person_image and garment_image"
            }), 400

        # Convert base64 images to PIL
        person_img = base64_to_pil(data['person_image'])
        garment_img = base64_to_pil(data['garment_image'])

        # Save temporarily for API call
        temp_person_path = '/tmp/person.png'
        temp_garment_path = '/tmp/garment.png'

        person_img.save(temp_person_path)
        garment_img.save(temp_garment_path)

        print("🎨 Generating virtual try-on...")

        # Call Vertex AI Virtual Try-On API
        image = client.models.recontext_image(
            model="virtual-try-on-preview-08-04",
            source=RecontextImageSource(
                person_image=genai.types.Image.from_file(location=temp_person_path),
                product_images=[
                    ProductImage(product_image=genai.types.Image.from_file(location=temp_garment_path))
                ],
            ),
        )

        # Get the generated image
        generated_image = image.generated_images[0].image
        bytes_used = len(generated_image.image_bytes)

        # Convert to base64
        result_base64 = base64.b64encode(generated_image.image_bytes).decode('utf-8')

        # Clean up temp files
        os.remove(temp_person_path)
        os.remove(temp_garment_path)

        print(f"✅ Generated image using {bytes_used} bytes")

        return jsonify({
            "success": True,
            "result_image": result_base64,
            "bytes_used": bytes_used
        })

    except Exception as e:
        print(f"❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


if __name__ == '__main__':
    print("=" * 60)
    print("🚀 Starting Vertex AI Virtual Try-On Server")
    print("=" * 60)
    print()
    print("⚠️  IMPORTANT: Set these environment variables before starting:")
    print("   export GOOGLE_CLOUD_PROJECT=your-project-id")
    print("   export GOOGLE_CLOUD_LOCATION=global")
    print()
    print("📝 Authentication: Make sure you've run:")
    print("   gcloud auth application-default login")
    print()
    print("=" * 60)
    print()

    app.run(host='0.0.0.0', port=5002, debug=False)
