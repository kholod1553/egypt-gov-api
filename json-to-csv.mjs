import fs from "fs";

const jsonData = JSON.parse(
  fs.readFileSync("egypt_government_services.json", "utf8")
);

const rows = [];

rows.push([
  "category_id",
  "category_name",
  "service_id",
  "service_name",
  "data"
].join(","));

for (const category of jsonData.categories) {
  for (const service of category.services) {
    rows.push([
      `"${category.id}"`,
      `"${category.name}"`,
      `"${service.id}"`,
      `"${service.name}"`,
      `"${JSON.stringify(service).replace(/"/g, '""')}"`
    ].join(","));
  }
}

fs.writeFileSync("government_services.csv", rows.join("\n"));

console.log("✅ CSV file created successfully");