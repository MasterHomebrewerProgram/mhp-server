import Circuit, { Comp_Circuit } from "../../models/circuit.model";
import Comp from "../../models/comp.model";

export const runCircuitSeeds = async () => {
  console.log("Seeding Circuit table...");
  const numYears = 4;

  const circuits = await Circuit.bulkCreate(
    Array(numYears)
      .fill(null)
      .map((_, idx) => ({
        year: 2023 - idx,
      })),
    {
      ignoreDuplicates: true,
    }
  );

  await Promise.all(
    circuits.map(async (circuit) => {
      const allComps = await Comp.findAll();
      const yearComps = allComps.filter((comp) =>
        comp.name.includes(String(circuit.year))
      );

      return await Promise.all(
        yearComps.map((comp) => {
          Comp_Circuit.create({
            //@ts-expect-error CompId not exposed
            CompId: comp.id,
            CircuitId: circuit.id,
          });
        })
      );
    })
  );

  return circuits;
};
