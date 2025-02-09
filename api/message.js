let latestMessage = "";

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    latestMessage = message;
    res.status(200).json({ success: true, message: "Message received!" });
  } else if (req.method === 'GET') {
    res.status(200).json({ message: latestMessage });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
