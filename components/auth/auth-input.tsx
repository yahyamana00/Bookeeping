interface AuthInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AuthInput({ type, placeholder, value, onChange }: AuthInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-neutral-800/50 border border-neutral-700 rounded-2xl px-4 py-3 text-white placeholder:text-neutral-400 focus:outline-none focus:border-purple-500 transition-colors"
    />
  );
}