import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { 
  getCompany, 
  getCompanyById, 
  registerCompany, 
  updateCompany 
} from '../controller/company.controller.js';

const router = express.Router(); // capital R in Router

// Register a new company
router.post("/register", isAuthenticated, registerCompany);

// Get all companies of logged-in user
router.get("/get", isAuthenticated, getCompany);

// Get company by ID
router.get("/get/:id", isAuthenticated, getCompanyById);

// Update company by ID
router.put("/update/:id", isAuthenticated, updateCompany);

export default router;
