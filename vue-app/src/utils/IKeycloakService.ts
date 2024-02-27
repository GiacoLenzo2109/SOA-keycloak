export interface KeycloakService {
    login() : Promise<void>
    logout(): void
    init(): Promise<boolean>
    refreshToken(): Promise<void>
}