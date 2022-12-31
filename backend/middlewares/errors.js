/* eslint-disable import/prefer-default-export */
export const Errors = (res, error) => res.json({ error: error.message });
