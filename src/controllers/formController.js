const { Form, Template, User } = require('../models');

exports.createForm = async (req, res) => {
  try {
    const { templateId, answers } = req.body;
    const { id: fillerId } = req.user;

    const template = await Template.findByPk(templateId);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    const form = await Form.create({
      templateId,
      templateCreatorId: template.userId,
      fillerId,
      ...answers,
    });

    res.status(201).json({ message: 'Form successfully submitted', form });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllForms = async (req, res) => {
  try {
    const forms = await Form.findAll({
      include: [
        { model: Template, as: 'template', attributes: ['title'] },
        { model: User, as: 'templateCreator', attributes: ['name', 'email'] },
        { model: User, as: 'filler', attributes: ['name', 'email'] },
      ],
    });

    res.status(200).json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getFormById = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await Form.findByPk(id, {
      include: [
        { model: Template, as: 'template', attributes: ['title'] },
        { model: User, as: 'templateCreator', attributes: ['name', 'email'] },
        { model: User, as: 'filler', attributes: ['name', 'email'] },
      ],
    });

    if (!form) {
      return res.status(404).json({ message: 'Filled form not found' });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteForm = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await Form.findByPk(id);
    if (!form) {
      return res.status(404).json({ message: 'Filled form not found' });
    }

    await form.destroy();
    res.status(200).json({ message: 'Filled form deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
