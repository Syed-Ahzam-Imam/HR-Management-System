'use strict';

const Resume = require('../models/resumeModel');
const fs = require('fs');
const path = require('path');

class ResumeController {
  static async uploadResume(req, res) {
    try {
      const { resumeDetails } = req.body;
      const pdf = req.file ? req.file.path : null;

      const resume = await Resume.create({ resumeDetails, pdf });

      return res.status(201).json({ success: true, message: 'Resume uploaded successfully', resume });
    } catch (error) {
      console.error('Error uploading resume:', error);
      return res.status(500).json({ success: false, message: 'Failed to upload resume', error: error.message });
    }
  }
  static async getAllResumes(req, res) {
    try {
      const resumes = await Resume.findAll();

      // Parse resumeDetails from JSON string to array and include PDF path
      const resumesWithArrayDetails = resumes.map(resume => {
        const resumeDetails = JSON.parse(resume.resumeDetails); // Parse resumeDetails from JSON string to array

        // Standardize keys
        const standardizedDetails = {
          name: resumeDetails.name || resumeDetails.firstName || resumeDetails.Name || resumeDetails.fullName,
          location: resumeDetails.location || resumeDetails.address || resumeDetails.Address || resumeDetails.locationAddress || resumeDetails.Contact?.Location || resumeDetails.Contact_Info?.Location,
          phone: resumeDetails.phoneNumber || resumeDetails.phone || resumeDetails.contactNumber || resumeDetails.contactNum || resumeDetails.contact || resumeDetails.mobileNumber || resumeDetails.phoneNum || resumeDetails.mobile || resumeDetails.cell || resumeDetails.Phone || resumeDetails.Contact?.Phone || resumeDetails.Contact_Info?.Phone||  resumeDetails.Contact_Info?.Phone_Number,
          email: resumeDetails.email ||
            resumeDetails.emailAddress ||
            resumeDetails.eMail ||
            resumeDetails.mail ||
            resumeDetails.electronicMail ||
            resumeDetails.emailId ||
            resumeDetails.emailID ||
            resumeDetails.emailAddress ||
            resumeDetails.contactEmail ||
            resumeDetails.personalEmail ||
            resumeDetails.businessEmail ||
            resumeDetails.emailContact ||
            resumeDetails.emailID ||
            resumeDetails.contactEmailAddress ||
            resumeDetails.contactMail ||
            resumeDetails.contactEmailId ||
            resumeDetails.contactEmailAddress ||
            resumeDetails.emailAddress ||
            resumeDetails.Contact?.Email ||
            resumeDetails.Contact_Info?.Email,
          city: resumeDetails.city || resumeDetails.City || resumeDetails.town || resumeDetails.area,
          experience: resumeDetails.experience || resumeDetails.yearsOfExperience || resumeDetails.exp || resumeDetails.years || resumeDetails.expYears || resumeDetails.workExperience || resumeDetails.work_experience || resumeDetails.professional_experience,
          branchName: resumeDetails.branchName || resumeDetails.branch || resumeDetails.branchOffice || resumeDetails.branchLocation || resumeDetails.branchLocation || resumeDetails.branchLocation || resumeDetails.branchLocation,
          position: resumeDetails.position || resumeDetails.jobTitle || resumeDetails.title || resumeDetails.designation || resumeDetails.occupation || resumeDetails.role || resumeDetails.job || resumeDetails.positionHeld || resumeDetails.position || resumeDetails.work || resumeDetails.workTitle || resumeDetails.workPosition,
          pdf: resume.pdf,
          resumeId: resume.resumeId,
          applyingPosition : resumeDetails.applyingPosition
        };


        return {
          ...resume.toJSON(), // Convert Sequelize model instance to plain object
          resumeDetails: standardizedDetails,

        };
      });
      const allResumes = resumes.map(resume => {
        const resumeDetails = JSON.parse(resume.resumeDetails); // Parse resumeDetails from JSON string to array

        return {
          ...resume.toJSON(), // Convert Sequelize model instance to plain object
          resumeDetails: resumeDetails,

        };
      });

      return res.status(200).json({ success: true, resumes: resumesWithArrayDetails, AllResume: allResumes });
    } catch (error) {
      console.error('Error retrieving resumes:', error);
      return res.status(500).json({ success: false, message: 'Failed to retrieve resumes', error: error.message });
    }
  }




  static async deleteResume(req, res) {
    try {
      const { resumeId } = req.params;

      const resume = await Resume.findByPk(resumeId);
      if (!resume) {
        return res.status(404).json({ success: false, message: 'Resume not found' });
      }

      // Delete the associated PDF file
      if (resume.pdf) {
        fs.unlinkSync(path.join(__dirname, '..', '..', resume.pdf));
      }

      await resume.destroy();

      return res.status(200).json({ success: true, message: 'Resume deleted successfully' });
    } catch (error) {
      console.error('Error deleting resume:', error);
      return res.status(500).json({ success: false, message: 'Failed to delete resume', error: error.message });
    }
  }
}

module.exports = ResumeController;
