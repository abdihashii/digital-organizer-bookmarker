import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: Request) {
  // Parse JSON body
  const { image_base64 } = await request.json();

  if (!image_base64) {
    return new Response(
      JSON.stringify({
        error: 'No image_base64 provided',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  try {
    // Upload image to Cloudinary
    const res = await cloudinary.uploader.upload(image_base64);
    const secure_url = res.secure_url;

    return new Response(
      JSON.stringify({
        cloudinary_image_secure_url: secure_url,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: err.message,
      }),
      {
        status: err.status || 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
