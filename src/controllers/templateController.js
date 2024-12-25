const { Template, User } = require('../models');
const CUSTOM_FIELD_TYPES = ['string', 'textarea', 'int', 'checkbox'];
NUMBER_OF_QUESTIONS = 4;

function cleaneTemplates(templates) {
    const cleanedTemplates = templates.map((template) => {
        const cleanedTemplate = {
          id: template.id,
          title: template.title,
          description: template.description,
          topic: template.topic,
          imageUrl: template.imageUrl,
          isPublic: template.isPublic,
          allowedUsers: template.allowedUsers,
          userId: template.userId,
          createdAt: template.createdAt,
          updatedAt: template.updatedAt,
        };
        CUSTOM_FIELD_TYPES.forEach((type) => {
          for (let i = 1; i <= NUMBER_OF_QUESTIONS; i++) {
            if (template[`custom_${type}${i}_state`]) {
              cleanedTemplate[`custom_${type}${i}_question`] = template[`custom_${type}${i}_question`];
            }
          };
        });
        cleanedTemplate.authorName = template.author ? template.author.name : null;
        return cleanedTemplate;
    });
    return cleanedTemplates;
};

exports.createTemplate = async (req, res) => {
  try {
    const templateData = req.body;

    const newTemplate = await Template.create({
      title: templateData.title,
      description: templateData.description,
      topic: templateData.topic,
      imageUrl: templateData.imageUrl,
      isPublic: templateData.isPublic,
      allowedUsers: templateData.allowedUsers,
      userId: req.user.id,

      custom_string1_state: templateData.custom_string1_state,
      custom_string1_question: templateData.custom_string1_question,
      custom_string2_state: templateData.custom_string2_state,
      custom_string2_question: templateData.custom_string2_question,
      custom_string3_state: templateData.custom_string3_state,
      custom_string3_question: templateData.custom_string3_question,
      custom_string4_state: templateData.custom_string4_state,
      custom_string4_question: templateData.custom_string4_question,

      custom_textarea1_state: templateData.custom_textarea1_state,
      custom_textarea1_question: templateData.custom_textarea1_question,
      custom_textarea2_state: templateData.custom_textarea2_state,
      custom_textarea2_question: templateData.custom_textarea2_question,
      custom_textarea3_state: templateData.custom_textarea3_state,
      custom_textarea3_question: templateData.custom_textarea3_question,
      custom_textarea4_state: templateData.custom_textarea4_state,
      custom_textarea4_question: templateData.custom_textarea4_question,

      custom_int1_state: templateData.custom_int1_state,
      custom_int1_question: templateData.custom_int1_question,
      custom_int2_state: templateData.custom_int2_state,
      custom_int2_question: templateData.custom_int2_question,
      custom_int3_state: templateData.custom_int3_state,
      custom_int3_question: templateData.custom_int3_question,
      custom_int4_state: templateData.custom_int4_state,
      custom_int4_question: templateData.custom_int4_question,

      custom_checkbox1_state: templateData.custom_checkbox1_state,
      custom_checkbox1_question: templateData.custom_checkbox1_question,
      custom_checkbox2_state: templateData.custom_checkbox2_state,
      custom_checkbox2_question: templateData.custom_checkbox2_question,
      custom_checkbox3_state: templateData.custom_checkbox3_state,
      custom_checkbox3_question: templateData.custom_checkbox3_question,
      custom_checkbox4_state: templateData.custom_checkbox4_state,
      custom_checkbox4_question: templateData.custom_checkbox4_question,
    });

    res.status(201).json({
      message: 'Template created successfully',
      template: newTemplate,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  };
};

exports.getAllTemplates = async (req, res) => {
    try {
      const templates = await Template.findAll({
        where: {
          isPublic: true,
        },
        include: [
            {
              model: User,
              as: 'author',
              attributes: ['name'],
            },
          ],
      });
  
      const cleanedTemplates = cleaneTemplates(templates);
      res.status(200).json({
        message: 'Templates retrieved successfully',
        templates: cleanedTemplates,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    };
};

exports.getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Template.findByPk(id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['name'],
        },
      ],
    });

    if (!template) {
      return res.status(404).json({
        message: 'Template not found',
      });
    };

    const cleanedTemplate = cleaneTemplates([template]);

    res.status(200).json({
      message: 'Template retrieved successfully',
      template: cleanedTemplate[0],
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.deleteTemplate = async (req, res) => {
    try {
      const { id } = req.params;
  
      const template = await Template.findByPk(id);
  
      if (!template) {
        return res.status(404).json({
          message: 'Template not found',
        });
      }

      if (template.userId !== req.user.id && !req.user.isAdmin) {
        return res.status(403).json({
          message: 'Forbidden: You are not allowed to delete this template',
        });
      };
  
      await template.destroy();
  
      res.status(200).json({
        message: 'Template deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    };
};

exports.updateTemplate = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const template = await Template.findByPk(id);
  
      if (!template) {
        return res.status(404).json({
          message: 'Template not found',
        });
      };
  
      if (template.userId !== req.user.id && !req.user.isAdmin) {
        return res.status(403).json({
          message: 'Forbidden: You are not allowed to edit this template',
        });
      };
  
      await template.update({
        title: updatedData.title,
        description: updatedData.description,
        topic: updatedData.topic,
        imageUrl: updatedData.imageUrl,
        isPublic: updatedData.isPublic,
        allowedUsers: updatedData.allowedUsers,
  
        custom_string1_state: updatedData.custom_string1_state,
        custom_string1_question: updatedData.custom_string1_question,
        custom_string2_state: updatedData.custom_string2_state,
        custom_string2_question: updatedData.custom_string2_question,
        custom_string3_state: updatedData.custom_string2_state,
        custom_string3_question: updatedData.custom_string2_question,
        custom_string4_state: updatedData.custom_string2_state,
        custom_string4_question: updatedData.custom_string2_question,

        custom_textarea1_state: updatedData.custom_textarea1_state,
        custom_textarea1_question: updatedData.custom_textarea1_question,
        custom_textarea2_state: updatedData.custom_textarea1_state,
        custom_textarea2_question: updatedData.custom_textarea1_question,
        custom_textarea3_state: updatedData.custom_textarea1_state,
        custom_textarea3_question: updatedData.custom_textarea1_question,
        custom_textarea4_state: updatedData.custom_textarea1_state,
        custom_textarea4_question: updatedData.custom_textarea1_question,

        custom_int1_state: updatedData.custom_int1_state,
        custom_int1_question: updatedData.custom_int1_question,
        custom_int2_state: updatedData.custom_int1_state,
        custom_int2_question: updatedData.custom_int1_question,
        custom_int3_state: updatedData.custom_int1_state,
        custom_int3_question: updatedData.custom_int1_question,
        custom_int4_state: updatedData.custom_int1_state,
        custom_int4_question: updatedData.custom_int1_question,

        custom_checkbox1_state: updatedData.custom_checkbox1_state,
        custom_checkbox1_question: updatedData.custom_checkbox1_question,
        custom_checkbox2_state: updatedData.custom_checkbox1_state,
        custom_checkbox2_question: updatedData.custom_checkbox1_question,
        custom_checkbox3_state: updatedData.custom_checkbox1_state,
        custom_checkbox3_question: updatedData.custom_checkbox1_question,
        custom_checkbox4_state: updatedData.custom_checkbox1_state,
        custom_checkbox4_question: updatedData.custom_checkbox1_question,
      });
  
      res.status(200).json({
        message: 'Template updated successfully',
        template: template,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    };
};
