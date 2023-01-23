import { User } from '../entitys/User'

// get user/s controller
export const findUsers = async (userId?: number): Promise<User[]> => {
   return await User.find({
      ...(userId ? { where: { id: +userId } } : {}),
   })
}

// create a new user controller
export const createUser = async (record: any): Promise<User> => {
   const user = User.create(record)
   return await user.save()
}

// delete user controller
export const deleteUserById = async (userId: number): Promise<boolean> => {
   const res = await User.delete(userId)
   return res.affected ? true : false
}
