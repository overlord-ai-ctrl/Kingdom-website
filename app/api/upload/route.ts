import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof File))
    return NextResponse.json({ error: "No file" }, { status: 400 });

  const client = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: "auto",
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY || "",
      secretAccessKey: process.env.S3_SECRET_KEY || "",
    },
  });

  const arrayBuffer = await file.arrayBuffer();
  const key = `uploads/${Date.now()}_${file.name}`;
  await client.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: Buffer.from(arrayBuffer),
    }),
  );
  return NextResponse.json({ key });
}
