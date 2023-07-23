import verifyAdmin from "./verifyAdmin";
import verifyApplicant from "./verifyApplicant";
import verifyJWT from "./verifyJWT";
import verifyRecruiter from "./verifyRecruiter";

export const AdminMiddleware = [verifyJWT, verifyAdmin];
export const RecruiterMiddleware = [verifyJWT, verifyRecruiter];
export const ApplicantMiddleware = [verifyJWT, verifyApplicant];
