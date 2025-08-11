import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { addVoucher, findVoucherBySerial, generateSerial, getVouchers, suspendVoucher, unsuspendVoucher, Voucher } from "@/lib/vouchers";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [serial, setSerial] = useState("");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [balance, setBalance] = useState<string>("0");
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  useEffect(() => {
    setVouchers(getVouchers());
  }, []);

  useEffect(() => {
    setAuthed(localStorage.getItem("vinayak_admin_auth") === "1");
  }, []);

  const onGenerate = () => {
    const next = generateSerial(new Set(vouchers.map((v) => v.serial)));
    setSerial(next);
  };

const onAdd = () => {
  const amt = Math.max(0, Math.floor(Number(balance)));
  const res = addVoucher(serial.trim(), date, amt);
  if (!res.ok) {
    const msg = (res as { ok: false; error: string }).error;
    toast({ title: "Could not add voucher", description: msg });
    return;
  }
  setVouchers(getVouchers());
  setOpen(false);
  setSerial("");
  setBalance("0");
  toast({ title: "Voucher created", description: `Serial ${res.voucher.serial} • Balance ₹${res.voucher.balance}` });
};

  const onSuspend = (s: string) => {
    suspendVoucher(s);
    setVouchers(getVouchers());
  };

  const onUnsuspend = (s: string) => {
    unsuspendVoucher(s);
    setVouchers(getVouchers());
  };
  const searched = useMemo(() => {
    if (!search) return undefined;
    return findVoucherBySerial(search.trim());
  }, [search, vouchers]);

  return (
    <>
      <Helmet>
        <title>Admin – Gift Cards & Vouchers | Vinayak Supermarket</title>
        <meta name="description" content="Manage gift cards and vouchers for Vinayak Supermarket. Create, search, and suspend vouchers." />
        <link rel="canonical" href="/admin" />
      </Helmet>

        {!authed ? (
          <section className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
            <div className="max-w-md grid gap-3">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                aria-label="Admin password"
                className="w-full"
              />
              <Button
                onClick={() => {
                  if (pwd === "MAHESH@@2025") {
                    localStorage.setItem("vinayak_admin_auth", "1");
                    setAuthed(true);
                    toast({ title: "Access granted", description: "Welcome to Admin" });
                  } else {
                    toast({ title: "Invalid password", description: "Please try again" });
                  }
                }}
              >
                Login
              </Button>
            </div>
          </section>
        ) : (
          <section className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Gift Cards & Vouchers</h1>

            <div className="flex flex-col md:flex-row gap-3 md:items-end md:justify-between mb-6">
              <div className="flex gap-2 items-center w-full md:w-auto">
                <Input
                  placeholder="Search by 5-digit serial"
                  inputMode="numeric"
                  pattern="\\d{5}"
                  maxLength={5}
                  value={search}
                  onChange={(e) => setSearch(e.target.value.replace(/[^0-9]/g, "").slice(0,5))}
                  aria-label="Search voucher by serial number"
                  className="w-full md:w-64"
                />
                <Button variant="secondary" onClick={() => setSearch(search)}>
                  Search
                </Button>
              </div>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="hero">Add Voucher</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add a new voucher</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-2">
                    <div className="grid gap-2">
                      <label htmlFor="serial" className="text-sm">Serial number (5 digits)</label>
                      <div className="flex gap-2">
                        <Input
                          id="serial"
                          placeholder="12345"
                          inputMode="numeric"
                          pattern="\\d{5}"
                          maxLength={5}
                          value={serial}
                          onChange={(e) => setSerial(e.target.value.replace(/[^0-9]/g, "").slice(0,5))}
                        />
                        <Button type="button" variant="secondary" onClick={onGenerate}>Generate</Button>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="date" className="text-sm">Date of issue</label>
                      <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="balance" className="text-sm">Initial balance (₹)</label>
                      <Input
                        id="balance"
                        type="number"
                        inputMode="numeric"
                        min={0}
                        step={1}
                        value={balance}
                        onChange={(e) => setBalance(e.target.value.replace(/[^0-9]/g, ""))}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={onAdd}>Create voucher</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {searched !== undefined && (
              <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-1">Search result</div>
                {searched ? (
                  <div className="flex items-center gap-3">
                    <span className="font-medium">Serial: {searched.serial}</span>
                    <Badge variant={searched.suspended ? "destructive" : "default"}>
                      {searched.suspended ? "Suspended" : "Valid"}
                    </Badge>
                    <span className="text-muted-foreground">Issued: {searched.issuedAt}</span>
                    <span className="text-muted-foreground">Balance: ₹{searched.balance ?? 0}</span>
                  </div>
                ) : (
                  <div className="text-muted-foreground">No voucher found for serial {search}</div>
                )}
              </div>
            )}

            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Serial</TableHead>
                    <TableHead>Date issued</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Suspended on</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vouchers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No vouchers yet. Use "Add Voucher" to create one.
                      </TableCell>
                    </TableRow>
                  )}
                  {vouchers.map((v) => (
                    <TableRow key={v.id}>
                      <TableCell className="font-medium">{v.serial}</TableCell>
                      <TableCell>{v.issuedAt}</TableCell>
                      <TableCell>₹{v.balance ?? 0}</TableCell>
                      <TableCell>
                        <Badge variant={v.suspended ? "destructive" : "default"}>
                          {v.suspended ? "Suspended" : "Valid"}
                        </Badge>
                      </TableCell>
                      <TableCell>{v.suspendedAt ?? '-'}</TableCell>
                      <TableCell className="text-right">
                        {v.suspended ? (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onUnsuspend(v.serial)}
                          >
                            Unsuspend
                          </Button>
                        ) : (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onSuspend(v.serial)}
                          >
                            Suspend
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
        )}

    </>
  );
};

export default Admin;
