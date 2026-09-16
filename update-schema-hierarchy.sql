-- =========================================================
-- Update Database Schema for Student -> Faculty -> HOD -> Principal Hierarchy
-- =========================================================

-- Add new columns for tracking approvals at each stage
ALTER TABLE leaves ADD COLUMN faculty_approved_by INT AFTER approved_at;
ALTER TABLE leaves ADD COLUMN faculty_approved_at DATETIME AFTER faculty_approved_by;
ALTER TABLE leaves ADD COLUMN hod_approved_by INT AFTER faculty_approved_at;
ALTER TABLE leaves ADD COLUMN hod_approved_at DATETIME AFTER hod_approved_by;
ALTER TABLE leaves ADD COLUMN principal_approved_by INT AFTER hod_approved_at;
ALTER TABLE leaves ADD COLUMN principal_approved_at DATETIME AFTER principal_approved_by;

-- =========================================================
-- End of Schema Update
-- =========================================================
