export interface Voucher {
  id: string;
  serial: string; // 5-digit numeric string
  issuedAt: string; // ISO date string
  suspended: boolean;
  balance: number;
}

const STORAGE_KEY = "vinayak_vouchers";

function read(): Voucher[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? (JSON.parse(raw) as any[]) : [];
    return arr.map((v) => ({
      ...v,
      balance: typeof v.balance === "number" ? v.balance : 0,
    })) as Voucher[];
  } catch {
    return [];
  }
}

function write(vouchers: Voucher[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vouchers));
}

export function getVouchers(): Voucher[] {
  return read();
}

export function findVoucherBySerial(serial: string): Voucher | undefined {
  return read().find((v) => v.serial === serial);
}

export function addVoucher(
  serial: string,
  issuedAt: string,
  balance: number = 0
): { ok: true; voucher: Voucher } | { ok: false; error: string } {
  const valid = /^\d{5}$/.test(serial);
  if (!valid) return { ok: false, error: "Serial must be a 5-digit number" };
  const list = read();
  if (list.some((v) => v.serial === serial)) {
    return { ok: false, error: "Serial already exists" };
  }
  const normalizedBalance = isNaN(balance) || balance < 0 ? 0 : Math.floor(balance);
  const voucher: Voucher = {
    id: crypto.randomUUID(),
    serial,
    issuedAt,
    suspended: false,
    balance: normalizedBalance,
  };
  write([voucher, ...list]);
  return { ok: true, voucher };
}

export function suspendVoucher(serial: string) {
  const updated = read().map((v) => (v.serial === serial ? { ...v, suspended: true } : v));
  write(updated);
}

export function unsuspendVoucher(serial: string) {
  const updated = read().map((v) => (v.serial === serial ? { ...v, suspended: false } : v));
  write(updated);
}

export function generateSerial(existing: Set<string>): string {
  for (let i = 0; i < 10000; i++) {
    const n = Math.floor(10000 + Math.random() * 90000).toString();
    if (!existing.has(n)) return n;
  }
  return "00000";
}
