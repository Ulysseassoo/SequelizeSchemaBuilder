import { BsCalendar2Date } from "react-icons/bs"
import { BiText } from "react-icons/bi"
import { VscSymbolBoolean } from "react-icons/vsc"
import { AiOutlineNumber } from "react-icons/ai"

export const Fields = [
	{
		Icon: BsCalendar2Date,
		title: "Datetime",
		description: "A calendar date"
	},
	{
		Icon: BiText,
		title: "String",
		description: "Any text"
	},
	{
		Icon: VscSymbolBoolean,
		title: "Boolean",
		description: "True or False"
	},
	{
		Icon: AiOutlineNumber,
		title: "Int",
		description: "A fixed number"
	},
	{
		Icon: AiOutlineNumber,
		title: "BigInt",
		description: "A big number"
	},
	{
		Icon: AiOutlineNumber,
		title: "Float",
		description: "A Float number"
	},
	{
		Icon: AiOutlineNumber,
		title: "Decimal",
		description: "A Decimal number"
	}
]
