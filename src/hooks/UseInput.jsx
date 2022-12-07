function useInput({ type, className /*...*/ }) {
    const [value, setValue] = useState("");
    const input = <input className={className} value={value} onChange={e => setValue(e.target.value)} type={type} />;
    return [value, input];
  }