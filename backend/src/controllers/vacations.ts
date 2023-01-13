import { Vacation } from '../entitys/Vacation'

// get vacation/s controller
export const findVacations = async (
   vacationId?: number
): Promise<Vacation[]> => {
   return await Vacation.find({
      ...(vacationId ? { where: { id: +vacationId } } : {}),
   })
}

// create a new vacation controller
export const createVacation = async (record: Vacation): Promise<Vacation> => {
   const vacation = Vacation.create(record)
   return await vacation.save()
}

// delete vacation controller
export const deleteVacationById = async (
   vacationId: number
): Promise<boolean> => {
   const res = await Vacation.delete(vacationId)
   return res.affected ? true : false
}
