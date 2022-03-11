const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { AuthenticationError } = require('apollo-server-express');

const { User } = require('../../database/models');
const { Op } = require('@sequelize/core');

module.exports = {
    Mutation: {
        async register(root, args, context) {
            const { name, email, password } = args.input;
            const user = await User.create({ name, email, password });

            if (user && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id: user.id }, 'mySecret');
                return { ...user.toJSON(), token };
            }
            throw new AuthenticationError('Invalid credentials');
        },

        async login(root, { input }, context) {
            const { email, password } = input;
            const user = await User.findOne({ where: { email } });
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id: user.id }, 'mySecret');
                return { ...user.toJSON(), token };
            }
            throw new AuthenticationError('Invalid credentials');
        },
    },

    Query: {
        async getAllUsers(root, args, context) {
            return User.findAll({
                where: {
                    id: {
                        [Op.ne] : context.user.id
                    }
                }
            });
        },
        async getSingleUser(_, { userId }, context) {
            return User.findByPk(userId);
        },
    },

    User: {
        conversations(user) {
            return user.getConversations();
        }
    }
};
