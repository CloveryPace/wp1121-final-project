import { NextApiRequest, NextApiResponse } from "next";

//upload.ts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const fd = new FormData();
  fd.append("image", req.body.image);
  fd.append("type", "base64");
  const response = await fetch("https://api.imgur.com/3/image", {
    method: "POST",
    headers: {
      Authorization: "Client-ID process.env.IMGUR_ID",
    },
    body: fd,
    redirect: "follow",
  });
  const data = await response.json();
  return res.json(data);
}
