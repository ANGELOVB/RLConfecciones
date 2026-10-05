import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const [feature, entity] = process.argv.slice(2);

if (
  !feature ||
  !entity ||
  !/^[a-z][a-z0-9-]*$/.test(feature) ||
  !/^[A-Z][A-Za-z0-9]*$/.test(entity)
) {
  console.error(
    "Uso: npm run make:feature -- clientes Cliente",
  );
  process.exit(1);
}

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const destination = path.join(projectRoot, "src", "features", feature);

try {
  await access(destination);
  console.error(`La feature "${feature}" ya existe.`);
  process.exit(1);
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const name = entity[0].toLowerCase() + entity.slice(1);
const pageName = feature
  .split("-")
  .map((part) => part[0].toUpperCase() + part.slice(1))
  .join("");

const files = [
  `domain/${entity}.ts`,
  `domain/${entity}Repository.ts`,
  `application/${name}.use-cases.ts`,
  `infrastructure/${name}-api.repository.ts`,
  `presentation/stores/${name}.store.ts`,
  `presentation/schemas/${name}.schema.ts`,
  `presentation/components/${entity}Form.tsx`,
  `presentation/pages/${pageName}Page.tsx`,
  `${name}.dependencies.ts`,
];

for (const file of files) {
  const target = path.join(destination, file);

  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, "", { flag: "wx" });
}

console.log(`Feature creada en src/features/${feature}`);