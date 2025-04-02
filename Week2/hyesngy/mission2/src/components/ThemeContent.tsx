import clsx from "clsx";
import { THEME, useTheme } from "../context/ThemeProvider";

export default function ThemeContent() {
	const { theme } = useTheme();

	const isLightMode = theme === THEME.LIGHT;

	return (
		<div
			className={clsx(
				"p-4 h-dvh w-full",
				isLightMode ? "bg-white" : "bg-gray-800",
			)}
		>
			<h1
				className={clsx(
					"text-wxl font-bold",
					isLightMode ? "text-black" : "text-white",
				)}
			>
				Theme Content
			</h1>
			<p className={clsx("mt-2", isLightMode ? "text-black" : "text-white")}>
				명령·규칙 또는 처분이 헌법이나 법률에 위반되는 여부가 재판의 전제가 된
				경우에는 대법원은 이를 최종적으로 심사할 권한을 가진다. 군사재판을
				관할하기 위하여 특별법원으로서 군사법원을 둘 수 있다. 모든 국민은 근로의
				의무를 진다. 국가는 근로의 의무의 내용과 조건을 민주주의원칙에 따라
				법률로 정한다. 국가유공자·상이군경 및 전몰군경의 유가족은 법률이 정하는
				바에 의하여 우선적으로 근로의 기회를 부여받는다.
			</p>
		</div>
	);
}
