import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { RESTAURANT } from './lib/constants';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'li5dpkdx';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2023-10-01';

export default defineConfig({
  name: 'la-cocina-de-jose',
  title: `${RESTAURANT.name} — Menú`,
  basePath: '/',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool()],
  apiVersion,
});
