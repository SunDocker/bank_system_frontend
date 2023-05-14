import VueRouter from "vue-router"
import LoginRegister from "@/pages/LoginRegister"
import UserOperation from "@/pages/UserOperation"
import CustomerOperation from "@/pages/CustomerOperation"
import ClerkOperation from "@/pages/ClerkOperation"

export default new VueRouter({
    routes: [
        {
            path: '/operation',
            component: UserOperation,
            children: [
                {
                    path: 'customer/:customerName',
                    component: CustomerOperation,
                },
                {
                    path: 'clerk/:clerkName',
                    component: ClerkOperation
                }
            ]
        },
        {
            path: '/',
            component: LoginRegister,
        },
    ]
})