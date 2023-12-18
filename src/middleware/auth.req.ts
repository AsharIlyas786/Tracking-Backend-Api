import { Request } from 'express';

interface AuthenticatedRequest extends Request {
    user?: any; // Replace 'any' with the actual type of your user object

}

export default AuthenticatedRequest;
