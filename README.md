<div align="center">

[![logo](https://raw.githubusercontent.com/Shubhamai/AISandbox/main/public/assets/editor.svg)](https://tinygrad.org)

( In Development, pre-alpha ) Something like Figma, but for designing AI systems. Maintained by [Shubhamai](https://github.com/shubhamai).

<h3>

[Homepage](https://aisandbox.app) | [Documentation](https://aisandbox.app/docs) | [API Reference](https://aisandbox.app/api)

</h3>

[![GitHub Repo stars](https://img.shields.io/github/stars/shubhamai/aisandbox)](https://github.com/shubhamai/aisandbox/stargazers)
[![License](https://img.shields.io/github/license/shubhamai/aisandbox)](https://github.com/shubhamai/aisandbox/license)
[![Response Time](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FShubhamai%2FAISandbox-Status%2FHEAD%2Fapi%2Fai-sandbox%2Fresponse-time.json)](https://status.aisandbox.app)

</div>


## About

AISandbox is a node-based editor that allows creating an architecture of multiple models with inputs and outputs to perform a range of tasks. Think of Figma but for designing AI systems graphically.

Note that is still in development, pre-alpha.

### Features

- **Graphical Editor** - Create a graph of models, with inputs and outputs.
- **REST API** - Run the graph as an API, with a single click.
- **Self Hosted** - Entire application can be self-hosted.
- **Dashboard** - Manage your projects, and view usage statistics.

## Documentation

[Documentation](https://aisandbox.app/docs) | [API Reference](https://aisandbox.app/api)

To run the graph as an API, the code is programmatically generated in the UI, but here's a sample code

```py
from aisandbox import execute_project

project_id: str = "91392237-fc87-48b4-b83c-59c6ce0aad9d"

api_key: str = "ais-4ad62b20-74ab-4f55-a5df-856007db6261"


inputs = [{"id": "TextInputNode-dU-gccjt6igEbAVFnYs4x", "data": {"text": "Hello!"}}]

output = execute_project(project_id, api_key, inputs)

print(output.json())
```

## Tech Stack

#### Front end 
- [Nextjs 13](https://nextjs.org/docs) as the web framework. 
- [shadcn ui](https://ui.shadcn.com/) for the UI components. 
- [reactflow](https://reactflow.dev/) for the node editor.
- [Lucide](https://lucide.dev/) for icons.
- [zustand](https://zustand-demo.pmnd.rs/) for state management.
- [TailwindCSS](https://tailwindcss.com/) - CSS Framework

#### Backend
- [Supabase](https://supabase.com/) for user authentication and serves as the main database. 
- [Stripe](https://stripe.com/) for Payments.
- [OpenAI](https://openai.com/) and [Replicate](https://replicate.com/) to run most of the models.
- [Upstash](https://upstash.com/) - Rate Limiting, Caching.

#### Infrastructure

- The site is ~~deployed on [cloudflare](https://www.cloudflare.com/)~~ self hosted on Digitalocean $7 droplet, with cloudflare as reverse proxy. 


## Self Hosting

**(In progress)**

To self-host this application ( at least some of it ), follow the steps :

- Fill up the following API keys in `.env.example`, then rename it to `.env`.
- Make an account of supabase, and create the following DBs with types provided in [](./types_db.ts)
- Run `pnpm dev`.

## Acknowledgements

- Thanks to [Resend](https://resend.com/home), [Skiff](https://skiff.com/), [Supabase](https://supabase.com/) and [Figma](https://figma.com/) for site UI, design and landing page inspirations.
- Thanks to [Sniffnet](https://github.com/GyulyVGC/sniffnet/), [nextjs-subscription-payments](https://github.com/vercel/nextjs-subscription-payments), [tinygrad](https://github.com/tinygrad/tinygrad/) for readme, code structure. 
