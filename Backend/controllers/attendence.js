import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const attendenceChecking = async (req, res) => {
    try {
        console.log("attendence Checking");

        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));
        const userId = req.token.id;

        const attendanceRecord = await prisma.attendance.findFirst({
            where: {
                userId: userId,
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            },
            include: {
                user: {
                    select: {
                        userName: true
                    }
                }
            }
        });

        if (attendanceRecord) {
            console.log("attendence marked", attendanceRecord);
            const reStructured = {
                ID: attendanceRecord.id,
                IS_PRESENT: attendanceRecord.isPresent,
                USERNAME: attendanceRecord.user.userName
            };
            console.log("RESTRUCTURED", reStructured);
            res.status(200).json({ message: 'Attendance marked today', data: reStructured });
        } else {
            console.log("attendence not marked");
            res.status(404).json({ message: 'Attendance not marked today' });
        }
    } catch (error) {
        console.error("error from attendance checking", error);
        res.status(500).json({ message: 'Server error', error });
    }
};



export const attendenceMarking=async(req,res)=>{
    try {
        console.log("attendence Marking ");
        console.log(req.token);
        const response=await prisma.attendance.create({
            data:{
                userId:req.token.id,
                isPresent:true
            }
        })
        console.log(response);
        res.status(200).json({message: 'Attendance marked successfully', data: response });
    } catch (error) {
        console.error("error from attendenceMarking post section",error);
        res.status(500).json({ message: 'Server error',error });
    }

}