import { FC, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  List,
  ListItemButton,
  Paper,
  Typography
} from '@mui/material'
import { CategoryForm } from './categoryForm'
import { CreateCategoryBody } from '../../../../common/types/request/categoryRequestTypes'
import { useAppDispatch } from '../../store/store'
import { createCategory, updateCategory } from '../../store/category/actions'
import { useCategoryState } from '../../store/category/slice'
import { ICategory } from '../../../../common/types/types'
import CloseIcon from '@mui/icons-material/Close'
import { CategoryTypeColor, CategoryTypeLabel } from '../../constants/constants'

interface EditCategoryDialogProps {
  open: boolean
  onClose: () => void
}

export const EditCategoriesDialog: FC<EditCategoryDialogProps> = ({ onClose, open }) => {
  const dispatch = useAppDispatch()
  const { categories, loading } = useCategoryState()
  const [editingCategory, setEditingCategory] = useState<ICategory>()
  const [formOpen, setFormOpen] = useState(false)

  const handleSubmit = (data: CreateCategoryBody) => {
    if (!editingCategory) {
      handleCloseForm()
      dispatch(createCategory(data))
    } else {
      handleCloseForm()
      dispatch(updateCategory(data))

    }
  }

  const handleCloseForm = () => {
    setFormOpen(false)
    setEditingCategory(undefined)
  }

  const handleEditCategory = (category: ICategory) => {
    setEditingCategory(category)
    setFormOpen(true)
  }


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" mb={2} className="border-b">Категории</Typography>
        <Accordion expanded={formOpen} TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary>
            {
              formOpen
                ? <IconButton color="error" onClick={handleCloseForm}><CloseIcon/></IconButton>
                : <Button onClick={() => setFormOpen(true)}>Добавить категорию</Button>
            }
            {loading && <CircularProgress color="inherit" sx={{ ml: 'auto' }}/>}

          </AccordionSummary>
          <AccordionDetails>
            <CategoryForm onSubmit={handleSubmit} defaultValues={editingCategory}/>
          </AccordionDetails>
        </Accordion>

        <List>
          {categories.map(category => (
            <ListItemButton key={category._id} onClick={() => handleEditCategory(category)}>
              <Typography>{category.name}</Typography>
              <Typography ml="auto" color={CategoryTypeColor[category.type]}>
                {CategoryTypeLabel[category.type]}
              </Typography>
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Dialog>
  )
}
