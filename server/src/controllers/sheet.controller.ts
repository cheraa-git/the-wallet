import { ControllerHandler } from '../types/types'
import {
  CreateSheetBody,
  CreateSheetResponse,
  GetSheetsBody,
  GetSheetsResponse,
  RemoveSheetBody,
  RemoveSheetResponse,
  UpdateSheetBody,
  UpdateSheetResponse
} from '../../../common/types/request/sheetRequestTypes'
import { ErrorMessages } from '../../../common/errorMessages'
import { Sheet } from '../models/Sheet'
import { ISheet } from '../../../common/types/types'

class SheetController {
  getAll: ControllerHandler<GetSheetsBody, GetSheetsResponse> = async (req, res) => {
    try {
      const userId = req.user?._id
      const sheets = await Sheet.find({ userId }) as ISheet[]
      res.send(sheets)
    } catch (error) {
      res.send({ message: ErrorMessages.UNEXPECTED_ERROR, data: error })
    }
  }

  create: ControllerHandler<CreateSheetBody, CreateSheetResponse> = async (req, res) => {
    try {
      const sheet = { ...req.body, userId: req.user?._id }
      const newSheet: ISheet = (await Sheet.create(sheet)).toJSON()
      res.send(newSheet)
    } catch (error) {
      res.status(500).send({ message: ErrorMessages.UNEXPECTED_ERROR, data: error })
    }
  }

  update: ControllerHandler<UpdateSheetBody, UpdateSheetResponse> = async (req, res) => {
    try {
      const sheetId = req.params.sheetId
      const userId = req.user?._id
      const updatingSheet = await Sheet.findById(sheetId)
      if (updatingSheet?.userId?.toString() !== userId) {
        return res.status(401).send({ message: ErrorMessages.UNAUTHORIZED })
      }
      const updatedSheet = await Sheet.findByIdAndUpdate(sheetId, req.body, { new: true })
      res.send(updatedSheet?.toJSON())
    } catch (error) {
      res.status(500).send({ message: ErrorMessages.UNEXPECTED_ERROR, data: error })
    }
  }

  remove: ControllerHandler<RemoveSheetBody, RemoveSheetResponse> = async (req, res) => {
    try {
      const sheetId = req.params.sheetId
      const userId = req.user?._id
      const removingSheet = await Sheet.findById(sheetId)
      if (!removingSheet || removingSheet?.userId?.toString() !== userId) {
        return res.status(401).send({ message: ErrorMessages.UNAUTHORIZED })
      }
      await removingSheet.deleteOne()
      res.send({ _id: sheetId })
    } catch (error) {
      res.status(500).send({ message: ErrorMessages.UNEXPECTED_ERROR, data: error })
    }
  }
}

export const sheetController = new SheetController()
