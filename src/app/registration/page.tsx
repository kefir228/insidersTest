'use client'

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useRouter } from "next/navigation"
import { setEmail, setPassword, setConfirmPass, setUser, setLoading, setError } from "@/store/slicers/registrationReducer"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '@/utils/firebase'

export default function Registration() {
    const dispatch = useDispatch()
    const router = useRouter()
    const { email, password, confirmPass, error, loading } = useSelector((state: RootState) => state.registration)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPass) {
            dispatch(setError("Паролі не збігаються."));
            return;
        }
        if (password.length < 6) {
            dispatch(setError("Пароль повинен бути мінімум 6 символів."));
            return;
        }

        try {
            dispatch(setLoading(true));

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;

            dispatch(setUser({ email: user.email!, uid: user.uid }));

            router.push("/login");
        } catch (error: any) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }

    }
    return (
        <div className="max-w-lg mx-auto mt-10 p-5 border rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Реєстрація</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => dispatch(setEmail(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => dispatch(setPassword(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Підтвердження пароля"
                        value={confirmPass}
                        onChange={(e) => dispatch(setConfirmPass(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {error && <p className="text-red-500">{error}</p>}
                {loading && <p className="text-blue-500">Завантаження...</p>}

                <button
                    type="submit"
                    className="w-full mt-4 p-2 bg-blue-500 text-white rounded cursor-pointer"
                >
                    Зареєструватися
                </button>
            </form>

            <p className="mt-4 text-center">
                Вже маєте акаунт? <a href="/login" className="text-blue-500">Увійти</a>
            </p>
        </div>
    )
}