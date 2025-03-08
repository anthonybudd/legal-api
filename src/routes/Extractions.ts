import passport from './../providers/Passport';
import middleware from './middleware';
import express from 'express';

export const app = express.Router();



/**
 * GET /api/v1/extractions/:documentID
 * 
 */
app.get('/extractions/:documentID', [
    passport.authenticate('jwt', { session: false }),
    middleware.canAccessDocument,
], async (req: express.Request, res: express.Response) => {
    return res.json({
        documentID: req.params.documentID,
        extractedAt: "2023-07-20T15:30:00Z",
        confidence: 0.89,
        data: {
            parties: [
                {
                    name: "Acme Corporation",
                    type: "Company",
                    role: "Lessor"
                },
                {
                    name: "John Smith",
                    type: "Individual",
                    role: "Lessee"
                }
            ],
            dates: [
                {
                    type: "Effective Date",
                    date: "2023-01-15"
                },
                {
                    type: "Termination Date",
                    date: "2024-01-14"
                }
            ],
            amounts: [
                {
                    description: "Monthly Rent",
                    amount: 2500.00,
                    currency: "USD"
                },
                {
                    description: "Security Deposit",
                    amount: 5000.00,
                    currency: "USD"
                }
            ],
            clauses: [
                {
                    title: "Term",
                    text: "The term of this lease shall be for a period of twelve (12) months...",
                    pageNumber: 1,
                    confidence: 0.95
                },
                {
                    title: "Payment Terms",
                    text: "Rent shall be paid in monthly installments on the first day of each month...",
                    pageNumber: 2,
                    confidence: 0.92
                }
            ]
        }
    });
});
