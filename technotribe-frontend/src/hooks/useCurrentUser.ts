import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useCurrentUser() {
    return useQuery({
        queryKey: ["current-user"],
        queryFn: ()=>api.users.getProfile().then(res=>res?.data),
        enabled: !!localStorage.getItem("access_token")
    })
}