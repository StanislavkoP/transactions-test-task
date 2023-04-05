import { ValueOf } from './type-helpers'
import { USER_TYPE_LIST } from '../constants/constants'

export type UserTypes = ValueOf<typeof USER_TYPE_LIST>
