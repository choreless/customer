/** @deprecated */
export const addons = ['Delicates', 'Hang-Dry', 'Hangers', "Don't mix bags", 'Fabric Softener', 'OxiClean (Whites Only)'] as const;
export const addons2 = {
	Clorox: '$0.10 / lb',
	Vinegar: '$0.20 / unit',
	'Baking Soda': '$0.20 / unit',
	OxiClean: '$0.10 / lb',
	'All Free & Clear': '$0.00 / lb',
	'Customer Supplied': '$0.00 / lb',
	Bounce: '$0.10 / unit',
	Tide: '$0.15 / lb',
	Gain: '$0.15 / lb',
	'Softener Downy': '$0.10 / lb'
};
export const care_services = ['Delicates', 'Hang-Dry', 'Hangers', "Don't mix bags"] as const;
export const detergents = ['Premium Scented', 'Hypoallergenic', 'I will provide'] as const;
export const dryer_temperatures = ['High', 'Medium', 'Low'] as const;
export const water_temperatures = ['Cold', 'Hot'] as const;

export default { addons, addons2, care_services, detergents, dryer_temperatures, water_temperatures };
