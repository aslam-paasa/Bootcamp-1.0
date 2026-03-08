export default function DashboardLayout({ tab1, tab2 }) {
    return (
        
        // <div style={{ display: "flex", gap: "20px" }}>
        //     <div style={{flex: 2}}>{feed}</div>
        //     <div style={{flex: 1}}>{stats}</div>
        // </div>

        <div>
            <nav style={{ marginBottom: "10px" }}>
                <Link href={"/dashboard/tab1"}>Tab1</Link> | {" "}
                <Link href={"/dashboard/tab2"}>Tab2</Link>
            </nav>

            <div>
                {tab1 || tab2}
            </div>
        </div>
    )
}