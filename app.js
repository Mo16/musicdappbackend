import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/tts", async (req, res) => {
  console.log("hworking")
    const { lyrics } = req.body;

    const uberduckOptions = {
        method: "POST",
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Basic cHViX3FoZm1jcWZ1ZWFmZHBoYnFzaDpwa185MjMxMGEyZC02NzZlLTQzY2UtYmVjMC0yOGM0YWU4Y2I1ODg='
        },
        body: JSON.stringify({
            bpm: 90,
            voice: "zwf",
            format: "json",
            lyrics,
        }),
    };

    try {
        const response = await fetch(
            "https://api.uberduck.ai/tts/freestyle",
            uberduckOptions
        );
        console.log(33, response)
        const data = await response.json();
        res.json(data);
        console.log(data);
    } catch (error) {
      console.log(38, error)
        res.status(500).send("Error forwarding request to Uberduck API");
    }
});


app.post("/prompt", async (req, res) => {
    console.log("1");
    const { subject } = req.body;

    const uberduckOptions = {
        method: "POST",
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Basic cHViX3FoZm1jcWZ1ZWFmZHBoYnFzaDpwa185MjMxMGEyZC02NzZlLTQzY2UtYmVjMC0yOGM0YWU4Y2I1ODg='
        },
        body: JSON.stringify({
            subject,
            lines: 4,
        }),
    };

    try {
        const response = await fetch(
            "https://api.uberduck.ai/tts/lyrics",

            uberduckOptions
        );
        const data = await response.json();
        console.log(data);

        const uberduckOptions2 = {
            method: "POST",
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: 'Basic cHViX3FoZm1jcWZ1ZWFmZHBoYnFzaDpwa185MjMxMGEyZC02NzZlLTQzY2UtYmVjMC0yOGM0YWU4Y2I1ODg='
            },
            body: JSON.stringify({
                bpm: 90,
                voice: "zwf",
                format: "json",
                lyrics: data.lyrics,
            }),
        };

        try {
            const response = await fetch(
                "https://api.uberduck.ai/tts/freestyle",
                uberduckOptions2
            );
            const data = await response.json();
            console.log(data)

            res.json(data);
            console.log(data);
        } catch (error) {
            res.status(500).send("Error forwarding request to Uberduck API");
        }
    } catch (error) {
        res.status(500).send("Error forwarding request to Uberduck API");
    }
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
