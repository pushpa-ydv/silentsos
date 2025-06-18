export default function useSecretCode(input, secretCode) {
    return input.includes(secretCode);
}