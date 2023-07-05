<p align="center"><a href=""><img alt="AISandbox" src="public/assets/editor.svg" width="60%"/></a></p>
<p align="center"><a href="aisandbox.app">aisandbox.app</a></p>
<hr>

<p align="center">( In Development, pre-alpha ) Something like Figma, but for designing AI systems.</p>

<p align="center">
  <a href="https://github.com/Shubhamai/AISandbox/blob/master/LICENSE">
    <img alt="Excalidraw is released under the MIT license." src="https://img.shields.io/badge/license-MIT-blue.svg"  />
  </a>
</p>

<hr>

## About

AISandbox is a node-based editor that allows creating an architecture of multiple models with inputs and outputs to perform a range of tasks. Think of Figma but for designing AI systems graphically.

Note that is still in development, pre-alpha.

## Documentation

To run the graph as an API, the code is programmatically generated in the UI, but here's a sample code

```py
import requests
import json

payload = json.dumps(
    {"data": [{"id": "TextInputNode-1", "data": {"text": "Hello World"}}]}
)

headers = {
    "Content-Type": "application/json",
    "Authorization": "YOUR_API_KEY",
    "Project": "YOUR_PROJECT_ID",
}

response = requests.request("POST", "https://aisandbox.app/api/v1/execute", headers=headers, data=payload)
```

## Tech Stack

### Front end 
- [Nextjs 13](https://nextjs.org/docs) as the web framework. 
- [shadcn ui](https://ui.shadcn.com/) for the UI components. 
- [reactflow](https://reactflow.dev/) for the node editor.
- [Lucide](https://lucide.dev/) for icons.
- [zustand](https://zustand-demo.pmnd.rs/) for state management.

#### Backend
- [Supabase](https://supabase.com/) for user authentication and serves as the main database. 
- [Stripe](https://stripe.com/) for Payments.
- [OpenAI](https://openai.com/) and [Replicate](https://replicate.com/) to run most of the models.

### Infrastructure

- The site is deployed on [cloudflare](https://www.cloudflare.com/).


## Self Hosting

**(In progress)**

To self-host this application ( at least some of it ), follow the steps :

- Fill up the following API keys in `.env.example`, then rename it to `.env`.
- Make an account of supabase, and create the following DBs with types provided in [](./types_db.ts)
- Run `pnpm dev`.

## Acknowledgements

- Thanks to [Resend](https://resend.com/home), [Skiff](https://skiff.com/), [Supabase](https://supabase.com/) and [Figma](https://figma.com/) for side UI, design and landing page inspirations.
- Thanks to [Sniffnet](https://github.com/GyulyVGC/sniffnet/), [nextjs-subscription-payments](https://github.com/vercel/nextjs-subscription-payments) for readme, code structure. 
