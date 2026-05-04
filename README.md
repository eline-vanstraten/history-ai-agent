# 🎲 HistoDice - AI Agent

Een interactieve agent, gebouwd met JavaScript en moderne AI-tools zoals LangChain en OpenAI, die helpt bij het leren van kenmerkende aspecten van historische tijdvakken.

# Technologieën

- JavaScript 
- Express
- LangChain, LangChain Core, LangChain LangGraph & LangChain Classic
- LangChain Community + FAISS
- Azure Chat OpenAI API
- Pexels API
- Custom CSS
- Git en Github

# Functies

- Willekeurig tijdvak via dobbelsteen (1-10)
- Ophalen van relevante leerstof uit vector database
- Interactieve leerervaring met volgorde oefeningen
- Bijpassende foto per tijdvak

# Tools binnen de Agent
- **get_document**: Haalt relevante informatie op uit de vector database (PDF content)
- **roll_dice**: Genereert een willekeurig getal dat overeenkomt met een tijdvak
- **get_image**: Gebruikt de Pexels API om een passende afbeelding te vinden

# Data en Kennisbron
De agent gebruikt twee PDF-documenten:
1. Kenmerkende aspecten per tijdvak
   - Overzicht voor HAVO en VWO
   - Gebruikt voor de oefening: volgorde bepalen
2. Uitleg per tijdvak
   - Verdiepende informatie
   - Ondersteund begrip en feedback

# Installatie en gebruik

1. Clone de repository:

```sh
git clone https://github.com/eline-vanstraten/history-ai-agent.git
```

2. Ga naar de map:

```sh
cd history-ai-agent
```

3. Installeer dependencies:

```sh
npm install 
```

4. Maak een .env bestand:

```sh
cp .env.example .env
```

5. Kopieer in eigen .env en voeg je keys toe:

```sh
AZURE_OPENAI_API_VERSION=2025-03-01-preview
AZURE_OPENAI_API_INSTANCE_NAME=your_instance_name
AZURE_OPENAI_API_KEY=your_api_key
AZURE_OPENAI_API_DEPLOYMENT_NAME=gpt-4.1-mini
AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME=text-embedding-3-small

PEXELS_API_KEY=your_pexels_api_key
```

6. Start de server:

```sh
npm start
```

## ✦ Auteur

Eline van Straten
