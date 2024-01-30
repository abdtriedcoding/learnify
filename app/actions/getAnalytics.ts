import { db } from "@/lib/db";

export const getAnalytics = async (userId: string) => {
  // Get all courses of current user which has been purchased by others.
  const purchases = await db.purchase.findMany({
    where: {
      course: {
        userId: userId,
      },
    },
    include: {
      course: true,
    },
  });

  const grouped: { [courseTitle: string]: number } = {};

  // Contruct data in form of object
  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.course.price!;
  });

  // Modified the object in desired format
  const data = Object.entries(grouped).map(([courseTitle, total]) => ({
    name: courseTitle,
    total: total,
  }));

  // Generate the constants from calculated data
  const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
  const totalSales = purchases.length;

  return {
    data,
    totalRevenue,
    totalSales,
  };
};
