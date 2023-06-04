import { Op } from 'sequelize'
import Circuit, {CircuitAttributes, CircuitInput, Comp_Circuit} from '../models/circuit.model'
import Comp from '../models/comp.model'

export const getCircuit = async (circuitId: string): Promise<CircuitAttributes & {Comp?: Comp[]}> => {
  const circuit = await Circuit.findOne({
    where: {id: circuitId},
    include: [
      {
        model: Comp,
        attributes: ['id', 'name', 'description', 'photourl']
      }
    ]
  })

  if (!circuit) {
    return Promise.reject({message: "Could not find circuit"})
  }

  return circuit.get({plain: true})
}

export const createCircuit = async (circuitData: CircuitInput): Promise<CircuitAttributes> => {
  const newCircuit = await Circuit.create(circuitData)

  return newCircuit.get({plain:true})
}

export const addCompToCircuit = async (circuitId: string, compId: string): Promise<CircuitAttributes & {Comp?: Comp[]}> => {
  // TODO(matt): Validate circuit and comp IDs and reject if one (or both) do not exist
  
  await Comp_Circuit.create({
    //@ts-expect-error CompId not exposed
    "CompId": compId,
    "CircuitId": circuitId
  })

  const circuit = await Circuit.findOne({
    where: {id: circuitId},
    include: [
      {
        model: Comp,
        attributes: ['id', 'name', 'description', 'photourl']
      }
    ]
  })

  if (!circuit) {
    return Promise.reject({message: "Could not find circuit"})
  }

  return circuit.get({plain: true})
}

export const removeCompFromCircuit = async (circuitId: string, compId: string): Promise<CircuitAttributes & {Comp?: Comp[]}> => {
  await Comp_Circuit.destroy({
    where: {
      //@ts-expect-error CompId not exposed
      "CompId": compId,
      "CircuitId": circuitId
    }
  })
  
  const circuit = await Circuit.findOne({
    where: {id: circuitId},
    include: [
      {
        model: Comp,
        attributes: ['id', 'name', 'description', 'photourl']
      }
    ]
  })

  if (!circuit) {
    return Promise.reject({message: "Could not find circuit"})
  }

  return circuit.get({plain: true})
}

export const deleteCircuit = async (circuitId: string): Promise<boolean> => {
  const records = await Circuit.destroy({
    where: {id: circuitId}
  })

  return records > 0
}