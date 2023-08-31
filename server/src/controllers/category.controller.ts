import { ErrorMessages } from '../../../common/errorMessages'
import { Category } from '../models/Category'
import { ControllerHandler } from '../types/types'
import {
  CreateCategoryBody,
  CreateCategoryResponse,
  GetCategoriesResponse,
  UpdateCategoryBody,
  UpdateCategoryResponse
} from '../../../common/types/request/categoryRequestTypes'
import { ICategory } from '../../../common/types/types'
import { validationHandler } from '../utils/validation'
import { Sheet } from '../models/Sheet'

class CategoryController {
  getBySheetId: ControllerHandler<any, GetCategoriesResponse> = async (req, res) => {
    try {
      const sheetId = req.query.sheetId
      if (!sheetId) return res.status(400).send({ message: ErrorMessages.INVALID_QUERY_PARAMS })
      const categories = await Category.find({ sheetId }) as ICategory[]
      res.send(categories)
    } catch (error) {
      res.status(500).send({ message: ErrorMessages.UNEXPECTED_ERROR, data: error })
    }
  }

  createCategory: ControllerHandler<CreateCategoryBody, CreateCategoryResponse> = async (req, res) => {
    try {
      if (validationHandler(req, res)) return
      const newCategory: ICategory = (await Category.create(req.body)).toJSON()
      res.send(newCategory)
    } catch (error) {
      res.status(500).send({ message: ErrorMessages.UNEXPECTED_ERROR, data: error })
    }
  }

  updateCategory: ControllerHandler<UpdateCategoryBody, UpdateCategoryResponse> = async (req, res) => {
    try {
      if (validationHandler(req, res)) return
      const ownerUserId = (await Sheet.findOne({ _id: req.body.sheetId }))?.userId?.toJSON()
      if (req.user?._id !== ownerUserId) return res.status(500).send({ message: ErrorMessages.UNAUTHORIZED })
      const updatedCategory = await Category.findByIdAndUpdate(req.body._id, req.body, { new: true })
      res.send(updatedCategory?.toJSON())
    } catch (error) {
      res.status(500).send({ message: ErrorMessages.UNEXPECTED_ERROR, data: error })
    }
  }

  removeCategory: ControllerHandler = async (req, res) => {
    try {
      if (validationHandler(req, res)) return
      const categoryId = req.params.categoryId
      const removingCategory = await Category.findOne({ _id: categoryId })
      const ownerUserId = (await Sheet.findOne({ _id: removingCategory?.sheetId }))?.userId?.toJSON()
      if (req.user?._id !== ownerUserId) return res.status(500).send({ message: ErrorMessages.UNAUTHORIZED })
    } catch (error) {

    }

  }
}

export const categoryController = new CategoryController()
