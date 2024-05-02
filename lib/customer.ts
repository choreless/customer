/** @deprecated */
export const addons = ['Delicates', 'Hang-Dry', 'Hangers', "Don't mix bags", 'Fabric Softener', 'OxiClean (Whites Only)'] as const;
export const addons2 = [
	{name: 'Clorox', cost: '$0.10 / lb', wash_type: 'separate' },
	{name: 'Vinegar', cost: '$0.20 / unit', wash_type: 'both'},
	{name: 'Baking Soda', cost: '$0.20 / unit', wash_type: 'both'},
	{name: 'OxiClean', cost: '$0.10 / lb', wash_type: 'both'},
	{name: 'Bounce', cost: '$0.10 / unit', wash_type: 'both'},
	{name: 'Tide', cost: '$0.15 / lb', wash_type: 'both'},
	{name: 'Gain', cost: '$0.15 / lb', wash_type: 'both'},
	{name: 'Softener Downy', cost: '$0.10 / lb', wash_type: 'both'}
] as const;
export const detergents = [{value: 'Premium Scented', isPopular: false, description: 'Top-rated Premium brand scented detergent'}, {value: 'Hypoallergenic', isPopular: false, description: 'Detergent that is free from dyes, perfumes, scents, & optical brighteners'}, {value: 'Customer Provided', isPopular: false, description: 'Include detergent with your laungry and we`ll use it Whatever is not used will be returned to you.'}]as const;
export const dryer_temperatures = ['High', 'Medium', 'Low'] as const;
export const water_temperatures = ['Hot', 'Cold'] as const;

export default { addons, addons2, detergents, dryer_temperatures, water_temperatures };
