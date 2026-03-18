-- Migration: Add priority and dueDate columns to tasks table
-- Run this in DBeaver/MySQL Workbench

-- Add new columns
ALTER TABLE tasks 
ADD COLUMN priority VARCHAR(20) DEFAULT 'medium',
ADD COLUMN dueDate DATE NULL;

-- Update existing tasks with default priority
UPDATE tasks SET priority = 'medium' WHERE priority IS NULL;

