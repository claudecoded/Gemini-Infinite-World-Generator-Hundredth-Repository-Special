import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
import path from 'path';
import { buildSystemInstruction, buildUserPrompt } from './prompt-builder.js';

// Load environment variables securely from the local .env file
dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.error('❌ Error: GEMINI_API_KEY is not defined in your local .env file.');
  process.exit(1);
}

// Initialize the official unified Gemini client using the secure environment variable
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Configure CLI arguments using yargs
const argv = yargs(hideBin(process.argv))
  .option('prompt', {
    alias: 'p',
    type: 'string',
    description: 'The description of the 3D world/game you want to generate',
    demandOption: true,
  })
  .option('output', {
    alias: 'o',
    type: 'string',
    description: 'Output HTML filename (without extension)',
    default: 'generated-world',
  })
  .help()
  .argv;

async function main() {
  const promptDescription = argv.prompt;
  const fileName = `${argv.output.toLowerCase().replace(/\s+/g, '-')}.html`;
  const outputDir = path.join(process.cwd(), 'examples');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`\n🚀 Initializing Gemini 4 Argon for repository #100...`);
  console.log(`🎨 Concept: "${promptDescription}"`);
  console.log(`⏳ Activating Deep Reasoning & Long-Decode Pipeline. Please wait, this may take a few minutes as a massive code bundle is being generated...`);

  try {
    // Invoke the Gemini API using the latest SDK structures
    const response = await ai.models.generateContent({
      model: 'gemini-4-argon',
      contents: buildUserPrompt(promptDescription),
      config: {
        systemInstruction: buildSystemInstruction(),
        // Trigger the required deep reasoning window
        thinkingConfig: {
          thinkingBudget: 2048, 
        },
        temperature: 0.4,
        topP: 0.95,
      }
    });

    const responseText = response.text;

    // Regex to capture and extract the HTML code block from the response
    const htmlBlockRegex = /```html\s*([\s\S]*?)\s*```/;
    const match = responseText.match(htmlBlockRegex);

    if (!match || !match[1]) {
      console.error('\n❌ Error: The model did not properly format the output inside an HTML markdown block.');
      console.log('Writing raw response to log file for debugging purposes.');
      fs.writeFileSync(path.join(outputDir, 'debug-raw-log.txt'), responseText);
      return;
    }

    const cleanHtmlContent = match[1].trim();
    const outputPath = path.join(outputDir, fileName);

    // Save the generated full code bundle
    fs.writeFileSync(outputPath, cleanHtmlContent, 'utf8');

    console.log(`\n✨ Success! Your 100th repository just generated a brand new world.`);
    console.log(`📁 File saved at: ./examples/${fileName}`);
    console.log(`🌐 Open this file in any modern web browser to execute your standalone 3D environment!`);

  } catch (error) {
    console.error('\n❌ An error occurred during the code generation pipeline:', error.message);
  }
}

main();
