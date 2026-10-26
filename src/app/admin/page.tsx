"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ModernoBackground } from "../../components/ModernoBackground";
import { ModernoNavbar } from "../../components/ModernoNavbar";
import { Footer } from "../../components/Footer";
import { useModernoAuth, GlobalUserRecord, UserEntitlement } from "../../hooks/useModernoAuth";
import { supabase } from "../../lib/supabase";

export default function SuperAdminPage() {
  const { user, isSuperAdmin, isAuthenticated, isLoading } = useModernoAuth();

  // Database of all ecosystem users from Supabase
  const [users, setUsers] = useState<GlobalUserRecord[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "active" | "suspended">("ALL");
  const [productFilter, setProductFilter] = useState<string>("ALL");

  // Modals state
  const [selectedUserForPerk, setSelectedUserForPerk] = useState<GlobalUserRecord | null>(null);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<GlobalUserRecord | null>(null);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Form states for granting perks / tiers
  const [selectedProductForGrant, setSelectedProductForGrant] = useState("access");
  const [selectedTierForGrant, setSelectedTierForGrant] = useState<"free" | "vip" | "pro" | "family" | "enterprise" | "reseller">("pro");
  const [grantNote, setGrantNote] = useState("Cortesía de SuperAdmin");

  // Form states for full user editing (name, email, password, company, role)
  const [editUserName, setEditUserName] = useState("");
  const [editUserEmail, setEditUserEmail] = useState("");
  const [editUserCompany, setEditUserCompany] = useState("");
  const [editUserRole, setEditUserRole] = useState<"user" | "admin" | "superadmin">("user");
  const [editUserNewPassword, setEditUserNewPassword] = useState("");

  // Form states for creating new user
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserCompany, setNewUserCompany] = useState("");
  const [newUserRole, setNewUserRole] = useState<"user" | "admin" | "superadmin">("user");
  const [newUserInitialProduct, setNewUserInitialProduct] = useState("access");
  const [newUserInitialTier, setNewUserInitialTier] = useState<"free" | "vip" | "pro" | "family" | "enterprise" | "reseller">("pro");

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<"users" | "audit" | "billing" | "licenses">("users");

  // Audit Logs state
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [isLoadingAuditLogs, setIsLoadingAuditLogs] = useState(false);
  const [auditError, setAuditError] = useState<string | null>(null);
  const [auditActionFilter, setAuditActionFilter] = useState("ALL");
  const [auditStatusFilter, setAuditStatusFilter] = useState<"ALL" | "success" | "failure">("ALL");
  const [auditSearchQuery, setAuditSearchQuery] = useState("");
  const [selectedAuditLog, setSelectedAuditLog] = useState<any | null>(null);

  // Billing & Invoices state
  const [adminInvoices, setAdminInvoices] = useState<any[]>([]);
  const [isLoadingAdminInvoices, setIsLoadingAdminInvoices] = useState(false);
  const [adminInvoicesError, setAdminInvoicesError] = useState<string | null>(null);
  const [newInvoiceUserId, setNewInvoiceUserId] = useState("");
  const [newInvoiceProduct, setNewInvoiceProduct] = useState("access");
  const [newInvoiceTier, setNewInvoiceTier] = useState("pro");
  const [newInvoiceAmount, setNewInvoiceAmount] = useState("49.99");
  const [newInvoiceCurrency, setNewInvoiceCurrency] = useState("ARS");
  const [newInvoiceGateway, setNewInvoiceGateway] = useState("manual_transfer");
  const [isEmittingInvoice, setIsEmittingInvoice] = useState(false);

  // Software Licenses state
  const [adminLicenses, setAdminLicenses] = useState<any[]>([]);
  const [isLoadingLicenses, setIsLoadingLicenses] = useState(false);
  const [licensesError, setLicensesError] = useState<string | null>(null);
  const [newLicenseUserId, setNewLicenseUserId] = useState("");
  const [newLicenseProduct, setNewLicenseProduct] = useState("cleaner");
  const [newLicenseTier, setNewLicenseTier] = useState("pro");
  const [newLicenseMaxActivations, setNewLicenseMaxActivations] = useState(1);
  const [newLicenseNotes, setNewLicenseNotes] = useState("Licencia oficial Moderno Tech");
  const [isIssuingLicense, setIsIssuingLicense] = useState(false);

  // Fetch users from central Supabase
  const fetchSupabaseUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const { data: profiles, error: pError } = await supabase
        .from("global_profiles")
        .select("*, global_users(email, role, status, created_at)");

      const { data: entitlements, error: eError } = await supabase
        .from("user_product_entitlements")
        .select("*");

      if (!pError && profiles && profiles.length > 0) {
        const mappedUsers: GlobalUserRecord[] = profiles.map((p: any) => {
          const userEnts = entitlements
            ? entitlements
                .filter((e: any) => e.user_id === p.id)
                .map((e: any) => ({
                  productId: e.product_id,
                  productName: e.product_id,
                  tier: e.tier,
                  status: e.status,
                  quotaLabel: e.quota_limit_bytes ? `${Math.round(e.quota_limit_bytes / (1024 * 1024 * 1024))} GB` : e.tier.toUpperCase(),
                  grantedBy: e.granted_by,
                  grantNotes: e.grant_notes,
                }))
            : [];

          return {
            id: p.id,
            email: p.global_users?.email || p.id,
            name: p.name || "Usuario",
            company: p.company || "Particular",
            role: p.global_users?.role || "user",
            status: p.global_users?.status || "active",
            createdAt: p.created_at || new Date().toISOString(),
            entitlements: userEnts,
          };
        });

        setUsers(mappedUsers);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Error fetching from Supabase:", err);
      setUsers([]);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // Fetch real audit logs from Supabase audit_logs table
  const fetchAuditLogs = async () => {
    setIsLoadingAuditLogs(true);
    setAuditError(null);
    try {
      const { data, error } = await supabase
        .from("audit_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) {
        setAuditError(error.message);
        setAuditLogs([]);
      } else {
        setAuditLogs(data || []);
      }
    } catch (err: any) {
      setAuditError(err?.message || "Error al conectar con la base de datos de auditoría.");
      setAuditLogs([]);
    } finally {
      setIsLoadingAuditLogs(false);
    }
  };

  // Fetch real billing invoices for SuperAdmin
  const fetchAdminInvoices = async () => {
    setIsLoadingAdminInvoices(true);
    setAdminInvoicesError(null);
    try {
      const { data, error } = await supabase
        .from("billing_invoices")
        .select("*, global_users(email)")
        .order("created_at", { ascending: false });

      if (error) {
        setAdminInvoicesError(error.message);
        setAdminInvoices([]);
      } else {
        setAdminInvoices(data || []);
      }
    } catch (err: any) {
      setAdminInvoicesError(err?.message || "Error al consultar facturas.");
      setAdminInvoices([]);
    } finally {
      setIsLoadingAdminInvoices(false);
    }
  };

  // Emit real invoice from SuperAdmin
  const handleEmitInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvoiceUserId || !newInvoiceAmount) return;

    setIsEmittingInvoice(true);
    try {
      const amountCents = Math.round(parseFloat(newInvoiceAmount) * 100);
      const invoiceNumber = `MOD-INV-${Date.now().toString().slice(-6)}`;
      const now = new Date();
      const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

      const { data, error } = await supabase
        .from("billing_invoices")
        .insert({
          invoice_number: invoiceNumber,
          user_id: newInvoiceUserId,
          product_id: newInvoiceProduct,
          tier: newInvoiceTier,
          amount_cents: amountCents,
          currency: newInvoiceCurrency,
          status: "paid",
          billing_period_start: now.toISOString(),
          billing_period_end: nextMonth.toISOString(),
          gateway_provider: newInvoiceGateway,
          gateway_payment_id: `ADMIN-MANUAL-${invoiceNumber}`,
        })
        .select()
        .single();

      if (error) {
        alert(`Error al emitir factura: ${error.message}`);
      } else {
        setActionSuccessMessage(`Factura ${invoiceNumber} emitida y registrada con auditoría.`);
        fetchAdminInvoices();
        fetchAuditLogs();
      }
    } catch (err: any) {
      alert(`Error inesperado: ${err?.message}`);
    } finally {
      setIsEmittingInvoice(false);
    }
  };

  // Fetch real software licenses for SuperAdmin
  const fetchAdminLicenses = async () => {
    setIsLoadingLicenses(true);
    setLicensesError(null);
    try {
      const { data, error } = await supabase
        .from("software_licenses")
        .select("*, global_users(email)")
        .order("created_at", { ascending: false });

      if (error) {
        setLicensesError(error.message);
        setAdminLicenses([]);
      } else {
        setAdminLicenses(data || []);
      }
    } catch (err: any) {
      setLicensesError(err?.message || "Error al consultar licencias de software.");
      setAdminLicenses([]);
    } finally {
      setIsLoadingLicenses(false);
    }
  };

  // Issue real software license
  const handleIssueLicense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLicenseUserId) return;

    setIsIssuingLicense(true);
    try {
      const keySegment = () => Math.random().toString(36).substring(2, 6).toUpperCase();
      const generatedKey = `MOD-${newLicenseProduct.toUpperCase()}-${keySegment()}-${keySegment()}-${keySegment()}`;

      const { error } = await supabase
        .from("software_licenses")
        .insert({
          license_key: generatedKey,
          user_id: newLicenseUserId,
          product_id: newLicenseProduct,
          tier: newLicenseTier,
          status: "active",
          max_activations: newLicenseMaxActivations,
          notes: newLicenseNotes,
        });

      if (error) {
        alert(`Error al emitir licencia: ${error.message}`);
      } else {
        setActionSuccessMessage(`Licencia ${generatedKey} emitida y auditada.`);
        fetchAdminLicenses();
        fetchAuditLogs();
      }
    } catch (err: any) {
      alert(`Error: ${err?.message}`);
    } finally {
      setIsIssuingLicense(false);
    }
  };

  // Revoke software license
  const handleRevokeLicense = async (licenseId: string, licenseKey: string) => {
    if (!confirm(`¿Confirmás la revocación definitiva de la licencia ${licenseKey}?`)) return;

    try {
      const { error } = await supabase
        .from("software_licenses")
        .update({ status: "revoked", updated_at: new Date().toISOString() })
        .eq("id", licenseId);

      if (error) {
        alert(`Error al revocar licencia: ${error.message}`);
      } else {
        setActionSuccessMessage(`Licencia ${licenseKey} revocada exitosamente.`);
        fetchAdminLicenses();
        fetchAuditLogs();
      }
    } catch (err: any) {
      alert(`Error: ${err?.message}`);
    }
  };

  useEffect(() => {
    fetchSupabaseUsers();
    fetchAuditLogs();
    fetchAdminInvoices();
    fetchAdminLicenses();
  }, [user]);

  // Open full edit modal
  const handleOpenEditModal = (targetUser: GlobalUserRecord) => {
    setSelectedUserForEdit(targetUser);
    setEditUserName(targetUser.name);
    setEditUserEmail(targetUser.email);
    setEditUserCompany(targetUser.company || "Particular");
    setEditUserRole(targetUser.role || "user");
    setEditUserNewPassword("");
  };

  // Save Full User Edit in Supabase
  const handleSaveUserEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForEdit) return;

    try {
      // 1. Update profile details
      await supabase
        .from("global_profiles")
        .update({
          name: editUserName.trim(),
          company: editUserCompany.trim(),
        })
        .eq("id", selectedUserForEdit.id);

      // 2. Update user role and email if modified
      await supabase
        .from("global_users")
        .update({
          email: editUserEmail.trim(),
          role: editUserRole,
        })
        .eq("id", selectedUserForEdit.id);

      // 3. Send password reset email if requested
      if (editUserNewPassword.trim().length >= 6) {
        const { error: resetErr } = await supabase.auth.resetPasswordForEmail(editUserEmail.trim());
        if (resetErr) {
          console.error("Error sending reset password email:", resetErr.message);
        }
      }
    } catch (err: any) {
      console.error("Error updating user in Supabase:", err);
      alert(`Error al actualizar usuario: ${err?.message || "Error desconocido"}`);
      return;
    }

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === selectedUserForEdit.id) {
          return {
            ...u,
            name: editUserName.trim(),
            email: editUserEmail.trim(),
            company: editUserCompany.trim(),
            role: editUserRole,
          };
        }
        return u;
      })
    );

    setActionSuccessMessage(`Datos de ${editUserEmail.trim()} actualizados correctamente en Supabase.`);
    setSelectedUserForEdit(null);
    setTimeout(() => setActionSuccessMessage(null), 4500);
  };

  // Filtered users list
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.company && u.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        u.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "ALL" || u.status === statusFilter;

      const matchesProduct =
        productFilter === "ALL" ||
        u.entitlements.some((e) => e.productId === productFilter && e.status === "active");

      return matchesSearch && matchesStatus && matchesProduct;
    });
  }, [users, searchQuery, statusFilter, productFilter]);

  // Filtered audit logs list
  const filteredAuditLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const matchesAction = auditActionFilter === "ALL" || log.action === auditActionFilter;
      const matchesStatus = auditStatusFilter === "ALL" || log.status === auditStatusFilter;
      const q = auditSearchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        log.action.toLowerCase().includes(q) ||
        log.resource_type.toLowerCase().includes(q) ||
        log.resource_id.toLowerCase().includes(q) ||
        (log.actor_email && log.actor_email.toLowerCase().includes(q)) ||
        (log.actor_user_id && log.actor_user_id.toLowerCase().includes(q));

      return matchesAction && matchesStatus && matchesSearch;
    });
  }, [auditLogs, auditActionFilter, auditStatusFilter, auditSearchQuery]);

  // KPIs
  const totalUsersCount = users.length;
  const activeUsersCount = users.filter((u) => u.status === "active").length;
  const suspendedUsersCount = users.filter((u) => u.status === "suspended").length;
  const proVipEntitlementsCount = users.reduce((acc, u) => {
    return acc + u.entitlements.filter((e) => e.tier !== "free" && e.status === "active").length;
  }, 0);

  // Quick Action: Toggle User Suspension in Supabase
  const handleToggleSuspension = async (targetUser: GlobalUserRecord) => {
    const newStatus = targetUser.status === "active" ? "suspended" : "active";

    try {
      await supabase
        .from("user_product_entitlements")
        .update({ status: newStatus })
        .eq("user_id", targetUser.id);

      await supabase
        .from("global_users")
        .update({ status: newStatus })
        .eq("id", targetUser.id);
    } catch (_) {}

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === targetUser.id) {
          return {
            ...u,
            status: newStatus,
            entitlements: u.entitlements.map((e) => ({
              ...e,
              status: newStatus,
            })),
          };
        }
        return u;
      })
    );

    setActionSuccessMessage(
      `Cuenta ${targetUser.email} ${newStatus === "suspended" ? "suspendida en Supabase" : "reactivada exitosamente"}.`
    );
    setTimeout(() => setActionSuccessMessage(null), 4000);
  };

  // Quick Action: Apply Grant / Upgrade Perk in Supabase
  const handleApplyGrant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForPerk) return;

    const productNames: Record<string, string> = {
      access: "Moderno Access",
      cloud: "Moderno Cloud",
      play: "Moderno Play",
      one: "Moderno One",
      ai: "Moderno AI",
      cleaner: "AI Cleaner Pro",
      crm: "Moderno CRM",
      cinema: "Cinema Studio AI",
      weather: "Moderno Weather",
      mercatto: "Mercatto",
      academy: "Moderno Academy",
    };

    const quotaLabels: Record<string, string> = {
      free: "Capa Gratuita",
      vip: "VIP Pass 4K 60FPS",
      pro: "Plan Pro Studio",
      family: "Bóveda Familiar 2 TB",
      enterprise: "Acceso Corporativo Ilimitado",
      reseller: "Cuenta Reseller / Distribuidor",
    };

    try {
      await supabase.from("user_product_entitlements").upsert({
        user_id: selectedUserForPerk.id,
        product_id: selectedProductForGrant,
        tier: selectedTierForGrant,
        status: "active",
        grant_notes: grantNote,
        granted_by: user?.id,
      });
    } catch (_) {}

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === selectedUserForPerk.id) {
          const existing = u.entitlements.find((ent) => ent.productId === selectedProductForGrant);
          let updatedEntitlements: UserEntitlement[];

          if (existing) {
            updatedEntitlements = u.entitlements.map((ent) => {
              if (ent.productId === selectedProductForGrant) {
                return {
                  ...ent,
                  tier: selectedTierForGrant as any,
                  status: "active",
                  quotaLabel: quotaLabels[selectedTierForGrant] || selectedTierForGrant.toUpperCase(),
                  grantNotes: grantNote,
                  grantedBy: "SuperAdmin (Jose Luis Brea Fabeiro)",
                };
              }
              return ent;
            });
          } else {
            updatedEntitlements = [
              ...u.entitlements,
              {
                productId: selectedProductForGrant,
                productName: productNames[selectedProductForGrant] || selectedProductForGrant,
                tier: selectedTierForGrant as any,
                status: "active",
                quotaLabel: quotaLabels[selectedTierForGrant] || selectedTierForGrant.toUpperCase(),
                grantNotes: grantNote,
                grantedBy: "SuperAdmin (Jose Luis Brea Fabeiro)",
              },
            ];
          }

          return { ...u, entitlements: updatedEntitlements };
        }
        return u;
      })
    );

    setActionSuccessMessage(
      `Beneficio guardado en Supabase para ${selectedUserForPerk.email}: ${productNames[selectedProductForGrant]} (${selectedTierForGrant.toUpperCase()}).`
    );
    setSelectedUserForPerk(null);
    setTimeout(() => setActionSuccessMessage(null), 4500);
  };

  // Quick Action: Create / Invite User in Supabase
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserEmail.trim()) return;

    if (!newUserPassword || newUserPassword.trim().length < 8) {
      alert("Por seguridad, la contraseña inicial debe tener al menos 8 caracteres.");
      return;
    }

    const productNames: Record<string, string> = {
      access: "Moderno Access",
      cloud: "Moderno Cloud",
      play: "Moderno Play",
      one: "Moderno One",
      ai: "Moderno AI",
      cleaner: "AI Cleaner Pro",
    };

    const quotaLabels: Record<string, string> = {
      free: "Capa Gratuita",
      vip: "VIP Pass 4K 60FPS",
      pro: "Plan Pro Studio",
      family: "Bóveda Familiar 2 TB",
      enterprise: "Acceso Corporativo Ilimitado",
      reseller: "Cuenta Reseller / Distribuidor",
    };

    try {
      // 1. Create auth user in Supabase
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: newUserEmail.trim(),
        password: newUserPassword.trim(),
        options: {
          data: {
            name: newUserName.trim() || newUserEmail.split("@")[0],
            role: newUserRole,
          },
        },
      });

      if (signUpError || !signUpData.user) {
        alert(`Error al crear usuario en Supabase: ${signUpError?.message || "Sin datos de usuario"}`);
        return;
      }

      const createdUserId = signUpData.user.id;

      // 2. Insert in global_profiles
      const { error: profileErr } = await supabase.from("global_profiles").upsert({
        id: createdUserId,
        name: newUserName.trim() || newUserEmail.split("@")[0],
        company: newUserCompany.trim() || "Particular",
      });
      if (profileErr) console.error("Error upserting profile:", profileErr.message);

      // 3. Insert initial entitlement
      const { error: entErr } = await supabase.from("user_product_entitlements").upsert({
        user_id: createdUserId,
        product_id: newUserInitialProduct,
        tier: newUserInitialTier,
        status: "active",
        granted_by: user?.id,
      });
      if (entErr) console.error("Error inserting entitlement:", entErr.message);

      const newRecord: GlobalUserRecord = {
        id: createdUserId,
        email: newUserEmail.trim(),
        name: newUserName.trim() || newUserEmail.split("@")[0],
        company: newUserCompany.trim() || "Particular",
        role: newUserRole,
        status: "active",
        createdAt: new Date().toISOString(),
        lastLogin: "Invitación creada",
        entitlements: [
          {
            productId: newUserInitialProduct,
            productName: productNames[newUserInitialProduct] || newUserInitialProduct,
            tier: newUserInitialTier as any,
            status: "active",
            quotaLabel: quotaLabels[newUserInitialTier] || newUserInitialTier.toUpperCase(),
            grantedBy: user?.name || "SuperAdmin",
          },
        ],
      };

      setUsers((prev) => [newRecord, ...prev]);
      setShowNewUserModal(false);
      setNewUserEmail("");
      setNewUserName("");
      setNewUserPassword("");
      setActionSuccessMessage(`Usuario ${newUserEmail.trim()} creado exitosamente en Supabase Auth.`);
      setNewUserCompany("");
    } catch (err: any) {
      alert(`Fallo en el proceso de alta: ${err.message || "Error desconocido"}`);
    }
  };

  // Quick Action: Delete User in Supabase
  const handleDeleteUser = async (targetUser: GlobalUserRecord) => {
    if (window.confirm(`¿Confirmás la eliminación permanente de la cuenta ${targetUser.email} en Supabase?`)) {
      try {
        await supabase.from("user_product_entitlements").delete().eq("user_id", targetUser.id);
        await supabase.from("global_profiles").delete().eq("id", targetUser.id);
        await supabase.from("global_users").delete().eq("id", targetUser.id);
      } catch (_) {}

      setUsers((prev) => prev.filter((u) => u.id !== targetUser.id));
      setActionSuccessMessage(`Cuenta ${targetUser.email} eliminada de Supabase.`);
      setTimeout(() => setActionSuccessMessage(null), 4000);
    }
  };

  const satelliteConsoles = [
    { name: "Moderno Access Console", icon: "🛡️", url: "https://access.moderno.com.ar", desc: "Consorcios, puertas, roles y hardware RFID/NFC", color: "#3B82F6" },
    { name: "Moderno One ERP", icon: "🏢", url: "https://one.moderno.com.ar", desc: "Ventas, inventario, facturación y multi-sucursal", color: "#157BFF" },
    { name: "Moderno Cloud Storage", icon: "☁️", url: "https://cloud.moderno.com.ar", desc: "Bóvedas familiares y cuotas de almacenamiento", color: "#00E5FF" },
    { name: "Moderno Play Gaming", icon: "🎮", url: "https://play.moderno.com.ar", desc: "Servidores 60 FPS y catálogo de emulación", color: "#EC4899" },
    { name: "Moderno CRM (WaTicket)", icon: "💬", url: "https://ticket.moderno.com.ar", desc: "Bandeja WhatsApp API y atención multiagente", color: "#10B981" },
    { name: "AI Cleaner Pro", icon: "⚡", url: "https://cleaner.moderno.com.ar", desc: "Licencias de activación y diagnóstico macOS", color: "#00C8FF" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center text-sm font-mono">
        <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-pulse mr-3" />
        Verificando credenciales criptográficas de SuperAdmin...
      </div>
    );
  }

  if (!isAuthenticated || !isSuperAdmin) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex flex-col items-center justify-center text-center p-6 select-none">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-3xl mb-4 text-rose-500">
          🛡️
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-white mb-2">Acceso Restringido</h1>
        <p className="text-xs text-[#94A3B8] max-w-md mb-6 leading-relaxed">
          Esta consola está reservada exclusivamente para operadores autorizados de Moderno Tech. Tu cuenta no cuenta con permisos de SuperAdmin en la base de datos central.
        </p>
        <a
          href="/login?redirect=/admin"
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-105 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
        >
          Iniciar Sesión con SuperAdmin &rarr;
        </a>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <ModernoBackground />
      <ModernoNavbar />

      <main className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 pt-32 sm:pt-36 pb-24 select-none">
        {/* Top Notification Toast */}
        {actionSuccessMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-[0_0_30px_rgba(16,185,129,0.2)] animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{actionSuccessMessage}</span>
            </div>
            <button onClick={() => setActionSuccessMessage(null)} className="text-white/50 hover:text-white text-sm">
              &times;
            </button>
          </div>
        )}

        {/* SuperAdmin Header */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0B0B10]/95 border border-white/[0.08] shadow-[0_25px_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-[10px] font-black px-3 py-1 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black tracking-widest uppercase shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                SUPERADMIN COMMAND CENTER
              </span>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>SUPABASE CENTRAL CONECTADO // rcskjdksimcfkdjzxara</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-sans">
              Gestión Global del Ecosistema Moderno Tech
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-1 max-w-2xl">
              Panel central de administración para Jose Luis Brea Fabeiro. Control de altas, bajas, cambio de contraseñas, edición de nombres, suspensión de cuentas y asignación granular de planes (Free, VIP, Pro, Reseller) para todos los sitios.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setShowNewUserModal(true)}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-all hover:scale-105 shadow-[0_0_25px_rgba(0,229,255,0.4)] flex items-center gap-2 cursor-pointer"
            >
              <span>+</span>
              <span>Dar de Alta Usuario</span>
            </button>
            <button
              onClick={fetchSupabaseUsers}
              className="px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              title="Refrescar datos desde Supabase"
            >
              <span>🔄</span>
              <span>Sincronizar Supabase</span>
            </button>
          </div>
        </div>

        {/* Real-time KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest block mb-1">
                TOTAL CUENTAS SUPABASE
              </span>
              <div className="text-3xl font-black text-white">{totalUsersCount}</div>
              <span className="text-[10px] text-emerald-400 font-mono mt-1 block">Unificadas en Supabase ID</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 flex items-center justify-center text-xl font-bold">
              👥
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest block mb-1">
                USUARIOS ACTIVOS
              </span>
              <div className="text-3xl font-black text-emerald-400">{activeUsersCount}</div>
              <span className="text-[10px] text-white/50 font-mono mt-1 block">Acceso pleno a productos</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xl font-bold">
              ✅
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest block mb-1">
                CUENTAS SUSPENDIDAS
              </span>
              <div className="text-3xl font-black text-rose-400">{suspendedUsersCount}</div>
              <span className="text-[10px] text-white/50 font-mono mt-1 block">Bloqueadas globalmente</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center justify-center text-xl font-bold">
              ⛔
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest block mb-1">
                TIERS PAGOS / BENEFICIOS
              </span>
              <div className="text-3xl font-black text-[#00E5FF]">{proVipEntitlementsCount}</div>
              <span className="text-[10px] text-[#00E5FF]/80 font-mono mt-1 block">VIP / Pro / Enterprise / Reseller</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#0052FF]/20 text-[#00E5FF] border border-[#0052FF]/40 flex items-center justify-center text-xl font-bold">
              💎
            </div>
          </div>
        </div>

        {/* Deep-Tech Satellite Consoles Router */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-[#00E5FF] tracking-widest uppercase">
              CONSOLAS OPERATIVAS PROFUNDAS (ACCESOS SATÉLITE DIRECTOS)
            </span>
            <span className="text-[10px] text-[#94A3B8] font-mono">Autenticación SSO Global con Moderno ID</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {satelliteConsoles.map((c) => (
              <a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#0B0B10] border border-white/[0.06] hover:border-[#00E5FF]/40 hover:bg-white/[0.02] transition-all group flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{c.icon}</span>
                  <div>
                    <h3 className="text-xs font-bold text-white group-hover:text-[#00E5FF] transition-colors">{c.name}</h3>
                    <p className="text-[10px] text-[#94A3B8] font-light">{c.desc}</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity">
                  Abrir &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Tab Switcher: Usuarios Globales vs Audit Logs */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "users"
                ? "bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black shadow-[0_0_20px_rgba(0,229,255,0.35)]"
                : "bg-white/[0.04] text-[#94A3B8] hover:text-white border border-white/[0.08]"
            }`}
          >
            <span>👥</span>
            <span>Gestión de Usuarios ({users.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("audit");
              fetchAuditLogs();
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "audit"
                ? "bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black shadow-[0_0_20px_rgba(0,229,255,0.35)]"
                : "bg-white/[0.04] text-[#94A3B8] hover:text-white border border-white/[0.08]"
            }`}
          >
            <span>📜</span>
            <span>Audit Logs en Tiempo Real ({auditLogs.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("billing");
              fetchAdminInvoices();
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "billing"
                ? "bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black shadow-[0_0_20px_rgba(0,229,255,0.35)]"
                : "bg-white/[0.04] text-[#94A3B8] hover:text-white border border-white/[0.08]"
            }`}
          >
            <span>💳</span>
            <span>Facturación & Cobros ({adminInvoices.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("licenses");
              fetchAdminLicenses();
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "licenses"
                ? "bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black shadow-[0_0_20px_rgba(0,229,255,0.35)]"
                : "bg-white/[0.04] text-[#94A3B8] hover:text-white border border-white/[0.08]"
            }`}
          >
            <span>🔑</span>
            <span>Licencias de Software ({adminLicenses.length})</span>
          </button>
        </div>

        {/* TAB 1: Global Users Management Table */}
        {activeTab === "users" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0B10]/95 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            {/* Table Filters & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/[0.06]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-black text-[#00E5FF] uppercase tracking-wider mr-2">
                  FILTRAR POR:
                </span>

                {/* Status Filter */}
                <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  <button
                    onClick={() => setStatusFilter("ALL")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      statusFilter === "ALL" ? "bg-[#00E5FF] text-black" : "text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    Todos ({totalUsersCount})
                  </button>
                  <button
                    onClick={() => setStatusFilter("active")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      statusFilter === "active" ? "bg-emerald-500 text-black" : "text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    Activos ({activeUsersCount})
                  </button>
                  <button
                    onClick={() => setStatusFilter("suspended")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      statusFilter === "suspended" ? "bg-rose-500 text-white" : "text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    Suspendidos ({suspendedUsersCount})
                  </button>
                </div>

                {/* Product Filter */}
                <select
                  value={productFilter}
                  onChange={(e) => setProductFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs font-bold focus:outline-none focus:border-[#00E5FF]"
                >
                  <option value="ALL" className="bg-[#050507]">Todos los Productos</option>
                  <option value="access" className="bg-[#050507]">Moderno Access</option>
                  <option value="cloud" className="bg-[#050507]">Moderno Cloud</option>
                  <option value="play" className="bg-[#050507]">Moderno Play</option>
                  <option value="one" className="bg-[#050507]">Moderno One</option>
                  <option value="ai" className="bg-[#050507]">Moderno AI</option>
                  <option value="cleaner" className="bg-[#050507]">AI Cleaner Pro</option>
                  <option value="crm" className="bg-[#050507]">Moderno CRM</option>
                </select>
              </div>

              {/* Search Input */}
              <div className="w-full md:w-80 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por usuario, email o ID..."
                  className="w-full px-4 py-2 pl-9 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-[#64748B] text-xs font-medium focus:outline-none focus:border-[#00E5FF]"
                />
                <svg className="w-4 h-4 text-[#00E5FF] absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="11" cy="11" r="8" strokeWidth="2" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {isLoadingUsers ? (
                <div className="py-12 text-center text-[#94A3B8] font-mono text-xs">
                  <span className="inline-block w-4 h-4 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin mr-2" />
                  Consultando usuarios en Supabase Central...
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="py-12 text-center text-[#94A3B8] font-mono text-xs">
                  No se encontraron usuarios registrados en la base de datos de Supabase.
                </div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">
                      <th className="py-3.5 px-4">Usuario & Entidad</th>
                      <th className="py-3.5 px-4">Identidad & ID</th>
                      <th className="py-3.5 px-4">Rol Global</th>
                      <th className="py-3.5 px-4">Estado Global</th>
                      <th className="py-3.5 px-4">Servicios & Tiers Habilitados</th>
                      <th className="py-3.5 px-4">Registro</th>
                      <th className="py-3.5 px-4 text-right">Acciones de SuperAdmin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                        {/* User & Company */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E5FF]/20 to-[#157BFF]/20 border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                              {u.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-white flex items-center gap-1.5">
                                <span>{u.name}</span>
                                {u.role === "superadmin" && (
                                  <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-[#00E5FF] text-black">
                                    DUEÑO
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-[#94A3B8]">{u.company}</div>
                            </div>
                          </div>
                        </td>

                        {/* Email & ID */}
                        <td className="py-4 px-4 font-mono text-[11px] text-[#94A3B8]">
                          <div className="text-white font-medium">{u.email}</div>
                          <div className="text-[9px] text-[#64748B]">{u.id}</div>
                        </td>

                        {/* Role */}
                        <td className="py-4 px-4">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              u.role === "superadmin"
                                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                : u.role === "admin"
                                ? "bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30"
                                : "bg-white/[0.04] text-[#94A3B8] border border-white/[0.08]"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              u.status === "active"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                u.status === "active" ? "bg-emerald-400" : "bg-rose-400"
                              }`}
                            />
                            {u.status === "active" ? "Activo" : "Suspendido"}
                          </span>
                        </td>

                        {/* Services & Tiers */}
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {u.entitlements && u.entitlements.length > 0 ? (
                              u.entitlements.map((ent) => (
                                <span
                                  key={ent.productId}
                                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                                    ent.status === "suspended"
                                      ? "bg-rose-500/10 text-rose-300 border-rose-500/30"
                                      : ent.tier === "vip" || ent.tier === "enterprise"
                                      ? "bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold"
                                      : ent.tier === "pro"
                                      ? "bg-[#00E5FF]/15 text-[#00E5FF] border-[#00E5FF]/30"
                                      : "bg-white/[0.04] text-white/70 border-white/[0.08]"
                                  }`}
                                  title={`${ent.productName}: ${ent.tier.toUpperCase()} (${ent.quotaLabel || "Cuota"})`}
                                >
                                  {ent.productId}:{ent.tier}
                                </span>
                              ))
                            ) : (
                              <span className="text-[10px] text-[#64748B] italic">Sin servicios asignados</span>
                            )}
                          </div>
                        </td>

                        {/* Created At */}
                        <td className="py-4 px-4 text-[#94A3B8] text-[11px] whitespace-nowrap">
                          <div>{new Date(u.createdAt).toLocaleDateString("es-AR")}</div>
                          <div className="text-[9px] text-[#64748B]">{u.lastLogin || "Online"}</div>
                        </td>

                        {/* Admin Actions */}
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Full Edit Modal (Name, Email, Password, Role) */}
                            <button
                              onClick={() => handleOpenEditModal(u)}
                              title="Editar Datos, Contraseña y Rol"
                              className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-white text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                            >
                              <span>✏️</span>
                              <span>Editar</span>
                            </button>

                            {/* Grant Perk / Change Plan */}
                            <button
                              onClick={() => setSelectedUserForPerk(u)}
                              title="Otorgar Beneficio / Cambiar Plan"
                              className="px-2.5 py-1.5 rounded-lg bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 text-[#00E5FF] text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                            >
                              <span>🎁</span>
                              <span>Planes</span>
                            </button>

                            {/* Toggle Suspend */}
                            {u.role !== "superadmin" && (
                              <button
                                onClick={() => handleToggleSuspension(u)}
                                title={u.status === "active" ? "Suspender cuenta globalmente" : "Reactivar cuenta"}
                                className={`px-2 py-1.5 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
                                  u.status === "active"
                                    ? "bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/30 text-rose-300"
                                    : "bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-300"
                                }`}
                              >
                                {u.status === "active" ? "Suspender" : "Reactivar"}
                              </button>
                            )}

                            {/* Delete User */}
                            {u.role !== "superadmin" && (
                              <button
                                onClick={() => handleDeleteUser(u)}
                                title="Eliminar cuenta permanentemente"
                                className="p-1.5 rounded-lg bg-white/[0.02] hover:bg-rose-500/20 text-white/40 hover:text-rose-400 border border-transparent hover:border-rose-500/30 transition-all cursor-pointer"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Audit Logs Management View */}
        {activeTab === "audit" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0B10]/95 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl animate-fade-in">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/[0.06]">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[11px] font-black text-[#00E5FF] uppercase tracking-wider mr-2">
                  FILTROS AUDIT:
                </span>

                {/* Status Filter */}
                <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  <button
                    onClick={() => setAuditStatusFilter("ALL")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      auditStatusFilter === "ALL" ? "bg-[#00E5FF] text-black" : "text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setAuditStatusFilter("success")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      auditStatusFilter === "success" ? "bg-emerald-500 text-black" : "text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    Éxito
                  </button>
                  <button
                    onClick={() => setAuditStatusFilter("failure")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      auditStatusFilter === "failure" ? "bg-rose-500 text-white" : "text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    Fallos
                  </button>
                </div>

                {/* Action Filter */}
                <select
                  value={auditActionFilter}
                  onChange={(e) => setAuditActionFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs font-bold focus:outline-none focus:border-[#00E5FF]"
                >
                  <option value="ALL" className="bg-[#050507]">Todas las Acciones</option>
                  <option value="user.role_changed" className="bg-[#050507]">user.role_changed</option>
                  <option value="user.status_changed" className="bg-[#050507]">user.status_changed</option>
                  <option value="user.deleted" className="bg-[#050507]">user.deleted</option>
                  <option value="entitlement.assigned" className="bg-[#050507]">entitlement.assigned</option>
                  <option value="entitlement.tier_changed" className="bg-[#050507]">entitlement.tier_changed</option>
                  <option value="entitlement.status_changed" className="bg-[#050507]">entitlement.status_changed</option>
                  <option value="entitlement.revoked" className="bg-[#050507]">entitlement.revoked</option>
                  <option value="license.activated" className="bg-[#050507]">license.activated</option>
                  <option value="license.activation_rejected" className="bg-[#050507]">license.activation_rejected</option>
                </select>

                <button
                  onClick={fetchAuditLogs}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white text-xs font-bold transition-all flex items-center gap-1.5"
                  title="Recargar registros"
                >
                  <span>🔄</span>
                  <span>Refrescar</span>
                </button>
              </div>

              {/* Search Input */}
              <div className="w-full md:w-80 relative">
                <input
                  type="text"
                  value={auditSearchQuery}
                  onChange={(e) => setAuditSearchQuery(e.target.value)}
                  placeholder="Buscar por actor, acción o recurso..."
                  className="w-full px-4 py-2 pl-9 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-[#64748B] text-xs font-medium focus:outline-none focus:border-[#00E5FF]"
                />
                <svg className="w-4 h-4 text-[#00E5FF] absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="11" cy="11" r="8" strokeWidth="2" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Error State */}
            {auditError && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center justify-between">
                <span>Error al consultar audit_logs: {auditError}</span>
                <button onClick={fetchAuditLogs} className="underline hover:text-white">Reintentar</button>
              </div>
            )}

            {/* Audit Logs Table */}
            <div className="overflow-x-auto">
              {isLoadingAuditLogs ? (
                <div className="py-12 text-center text-[#94A3B8] font-mono text-xs">
                  <span className="inline-block w-4 h-4 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin mr-2" />
                  Cargando registros criptográficos de auditoría desde Supabase...
                </div>
              ) : filteredAuditLogs.length === 0 ? (
                <div className="py-12 text-center text-[#94A3B8] font-mono text-xs">
                  {auditError ? "No se pudieron cargar los registros debido a un error de conexión." : "No existen eventos registrados que coincidan con los filtros seleccionados."}
                </div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">
                      <th className="py-3.5 px-4">Fecha / Hora</th>
                      <th className="py-3.5 px-4">Actor</th>
                      <th className="py-3.5 px-4">Acción</th>
                      <th className="py-3.5 px-4">Recurso</th>
                      <th className="py-3.5 px-4">Estado</th>
                      <th className="py-3.5 px-4">IP / Agente</th>
                      <th className="py-3.5 px-4 text-right">Detalles</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {filteredAuditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                        {/* Timestamp */}
                        <td className="py-4 px-4 font-mono text-[11px] text-[#94A3B8] whitespace-nowrap">
                          <div className="text-white font-medium">
                            {new Date(log.created_at).toLocaleString("es-AR")}
                          </div>
                          <div className="text-[9px] text-[#64748B]">{log.id.slice(0, 8)}...</div>
                        </td>

                        {/* Actor */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-white text-xs">{log.actor_email || "Sistema / Supabase"}</div>
                          <div className="text-[9px] font-mono text-[#64748B]">
                            {log.actor_user_id ? log.actor_user_id.slice(0, 8) + "..." : "system"}
                          </div>
                        </td>

                        {/* Action */}
                        <td className="py-4 px-4 font-mono text-xs">
                          <span className="px-2 py-0.5 rounded bg-white/[0.05] text-[#00E5FF] border border-white/[0.08]">
                            {log.action}
                          </span>
                        </td>

                        {/* Resource */}
                        <td className="py-4 px-4 text-xs">
                          <span className="text-white font-medium">{log.resource_type}</span>
                          <span className="text-[#94A3B8] font-mono text-[10px] ml-1.5">
                            ({log.resource_id})
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                              log.status === "success"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${log.status === "success" ? "bg-emerald-400" : "bg-rose-400"}`} />
                            {log.status === "success" ? "Éxito" : "Fallo"}
                          </span>
                        </td>

                        {/* IP & User Agent */}
                        <td className="py-4 px-4 text-[10px] text-[#94A3B8] font-mono">
                          <div>{log.ip_address || "Interna / Server"}</div>
                          <div className="truncate max-w-[140px] text-[#64748B] text-[9px]">{log.user_agent || "n/a"}</div>
                        </td>

                        {/* View Details Button */}
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => setSelectedAuditLog(log)}
                            className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-white text-[10px] font-bold transition-all cursor-pointer inline-flex items-center gap-1"
                          >
                            <span>🔍</span>
                            <span>Ver Payload</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Modal: Detalle de Audit Log */}
        {selectedAuditLog && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-[#0B0B10] border border-white/15 shadow-[0_20px_70px_rgba(0,0,0,0.95)] relative animate-fade-in max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedAuditLog(null)}
                className="absolute top-5 right-5 text-white/50 hover:text-white text-lg font-bold"
              >
                &times;
              </button>

              <div className="flex items-center gap-2 text-[10px] font-black text-[#00E5FF] uppercase tracking-widest mb-1">
                <span>EVENTO DE AUDITORÍA REGISTRADO</span>
              </div>
              <h3 className="text-xl font-black text-white font-sans mb-1">
                {selectedAuditLog.action}
              </h3>
              <p className="text-xs text-[#94A3B8] font-light mb-6">
                ID de Evento: <code className="text-white font-mono">{selectedAuditLog.id}</code>
              </p>

              <div className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div>
                    <span className="text-[10px] text-[#94A3B8] uppercase block">Actor</span>
                    <span className="text-white font-bold">{selectedAuditLog.actor_email || "Sistema"}</span>
                    <span className="text-[9px] text-[#64748B] block">{selectedAuditLog.actor_user_id}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#94A3B8] uppercase block">Fecha y Hora</span>
                    <span className="text-white">{new Date(selectedAuditLog.created_at).toLocaleString("es-AR")}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#94A3B8] uppercase block">Recurso</span>
                    <span className="text-white">{selectedAuditLog.resource_type}: {selectedAuditLog.resource_id}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#94A3B8] uppercase block">Estado</span>
                    <span className={selectedAuditLog.status === "success" ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                      {selectedAuditLog.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                {selectedAuditLog.error_message && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
                    <span className="font-bold block text-[10px] uppercase mb-1">Mensaje de Error</span>
                    <span>{selectedAuditLog.error_message}</span>
                  </div>
                )}

                <div>
                  <span className="text-[10px] text-[#94A3B8] uppercase block mb-1">Metadata</span>
                  <pre className="p-3 rounded-xl bg-black/60 border border-white/10 text-[#00E5FF] text-[11px] overflow-x-auto">
                    {JSON.stringify(selectedAuditLog.metadata, null, 2)}
                  </pre>
                </div>

                {selectedAuditLog.before_data && (
                  <div>
                    <span className="text-[10px] text-[#94A3B8] uppercase block mb-1">Before Data (Estado Previo)</span>
                    <pre className="p-3 rounded-xl bg-black/60 border border-white/10 text-amber-300 text-[11px] overflow-x-auto">
                      {JSON.stringify(selectedAuditLog.before_data, null, 2)}
                    </pre>
                  </div>
                )}

                {selectedAuditLog.after_data && (
                  <div>
                    <span className="text-[10px] text-[#94A3B8] uppercase block mb-1">After Data (Estado Resultante)</span>
                    <pre className="p-3 rounded-xl bg-black/60 border border-white/10 text-emerald-300 text-[11px] overflow-x-auto">
                      {JSON.stringify(selectedAuditLog.after_data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Facturación & Cobros */}
        {activeTab === "billing" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0B10]/95 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl animate-fade-in space-y-8">
            {/* Header & Emit Form */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-sm font-black text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <span>🧾</span>
                <span>Emitir Factura / Cobro Manual (SuperAdmin)</span>
              </h3>
              <p className="text-xs text-[#94A3B8] font-light mb-6">
                Genera comprobantes oficiales y registra ingresos en la base de datos de auditoría contable.
              </p>

              <form onSubmit={handleEmitInvoice} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                <div className="lg:col-span-2">
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                    Usuario Destino
                  </label>
                  <select
                    value={newInvoiceUserId}
                    onChange={(e) => setNewInvoiceUserId(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-[#00E5FF]"
                  >
                    <option value="" className="bg-[#050507]">Seleccionar Usuario...</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id} className="bg-[#050507]">
                        {u.email} ({u.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                    Producto
                  </label>
                  <select
                    value={newInvoiceProduct}
                    onChange={(e) => setNewInvoiceProduct(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-[#00E5FF]"
                  >
                    <option value="access" className="bg-[#050507]">Access</option>
                    <option value="cloud" className="bg-[#050507]">Cloud</option>
                    <option value="play" className="bg-[#050507]">Play</option>
                    <option value="one" className="bg-[#050507]">One</option>
                    <option value="cleaner" className="bg-[#050507]">Cleaner Pro</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                    Tier
                  </label>
                  <select
                    value={newInvoiceTier}
                    onChange={(e) => setNewInvoiceTier(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-[#00E5FF]"
                  >
                    <option value="pro" className="bg-[#050507]">Pro</option>
                    <option value="vip" className="bg-[#050507]">VIP</option>
                    <option value="enterprise" className="bg-[#050507]">Enterprise</option>
                    <option value="family" className="bg-[#050507]">Family</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                    Monto ({newInvoiceCurrency})
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newInvoiceAmount}
                    onChange={(e) => setNewInvoiceAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isEmittingInvoice}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.35)] transition-transform hover:scale-105 cursor-pointer disabled:opacity-50"
                  >
                    {isEmittingInvoice ? "Emitiendo..." : "Emitir Factura"}
                  </button>
                </div>
              </form>
            </div>

            {/* Invoices List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-black text-[#00E5FF] uppercase tracking-wider">
                  HISTORIAL DE FACTURAS EMITIDAS ({adminInvoices.length})
                </span>
                <button
                  onClick={fetchAdminInvoices}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <span>🔄</span>
                  <span>Refrescar</span>
                </button>
              </div>

              {adminInvoicesError && (
                <div className="mb-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold">
                  {adminInvoicesError}
                </div>
              )}

              {isLoadingAdminInvoices ? (
                <div className="py-12 text-center text-[#94A3B8] font-mono text-xs">
                  <span className="inline-block w-4 h-4 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin mr-2" />
                  Consultando facturas en Supabase...
                </div>
              ) : adminInvoices.length === 0 ? (
                <div className="py-12 text-center text-[#94A3B8] font-mono text-xs">
                  No existen facturas emitidas registradas en el sistema.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/[0.08] text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">
                        <th className="py-3.5 px-4">Comprobante</th>
                        <th className="py-3.5 px-4">Usuario / Email</th>
                        <th className="py-3.5 px-4">Servicio & Plan</th>
                        <th className="py-3.5 px-4">Monto</th>
                        <th className="py-3.5 px-4">Estado</th>
                        <th className="py-3.5 px-4">Fecha</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {adminInvoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-white/[0.02]">
                          <td className="py-4 px-4 font-mono text-white font-bold">
                            {inv.invoice_number}
                          </td>
                          <td className="py-4 px-4 text-[#94A3B8]">
                            <div className="text-white font-bold">{inv.global_users?.email || inv.user_id}</div>
                            <div className="text-[9px] font-mono text-[#64748B]">{inv.user_id}</div>
                          </td>
                          <td className="py-4 px-4 text-white">
                            <span className="font-bold">{inv.product_id}</span>
                            <span className="text-[10px] text-[#00E5FF] font-mono ml-2 uppercase">({inv.tier})</span>
                          </td>
                          <td className="py-4 px-4 font-bold text-white">
                            ${(inv.amount_cents / 100).toFixed(2)} {inv.currency}
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                inv.status === "paid"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                              }`}
                            >
                              {inv.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-[#94A3B8] text-[11px] whitespace-nowrap">
                            {new Date(inv.created_at).toLocaleString("es-AR")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: Software Licenses Management */}
        {activeTab === "licenses" && (
          <div className="space-y-8 animate-fade-in">
            {/* Formulario: Emitir Nueva Licencia */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0B10]/95 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl">
              <div className="flex items-center gap-2 text-[10px] font-black text-[#00E5FF] uppercase tracking-widest mb-1">
                <span>EMISIÓN CRIPTOGRÁFICA DE LICENCIA</span>
              </div>
              <h2 className="text-xl font-black text-white font-sans mb-1">
                Generar Licencia de Software Oficial
              </h2>
              <p className="text-xs text-[#94A3B8] font-light mb-6">
                Emite licencias para aplicaciones instalables (AI Cleaner Pro, Moderno Voice, Cinema Studio) con control estricto de activaciones por hardware.
              </p>

              <form onSubmit={handleIssueLicense} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                <div className="lg:col-span-1">
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                    Usuario Destinatario
                  </label>
                  <select
                    required
                    value={newLicenseUserId}
                    onChange={(e) => setNewLicenseUserId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-[#00E5FF]"
                  >
                    <option value="" className="bg-[#050507]">Seleccionar Usuario...</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id} className="bg-[#050507]">
                        {u.name} ({u.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                    Software / App
                  </label>
                  <select
                    value={newLicenseProduct}
                    onChange={(e) => setNewLicenseProduct(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-[#00E5FF]"
                  >
                    <option value="cleaner" className="bg-[#050507]">AI Cleaner Pro</option>
                    <option value="voice" className="bg-[#050507]">Moderno Voice</option>
                    <option value="cinema" className="bg-[#050507]">Cinema Studio</option>
                    <option value="access" className="bg-[#050507]">Moderno Access</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                    Tier / Nivel
                  </label>
                  <select
                    value={newLicenseTier}
                    onChange={(e) => setNewLicenseTier(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-[#00E5FF]"
                  >
                    <option value="pro" className="bg-[#050507]">Pro Edition</option>
                    <option value="enterprise" className="bg-[#050507]">Enterprise / Multi-Mac</option>
                    <option value="lifetime" className="bg-[#050507]">Lifetime Pass</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                    Máx. Activaciones
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newLicenseMaxActivations}
                    onChange={(e) => setNewLicenseMaxActivations(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isIssuingLicense || !newLicenseUserId}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-105 disabled:opacity-50 cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.35)]"
                  >
                    {isIssuingLicense ? "Generando..." : "Emitir Licencia"}
                  </button>
                </div>
              </form>
            </div>

            {/* Listado de Licencias Emitidas */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0B10]/95 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-black text-white">Registro Central de Licencias</h3>
                  <p className="text-xs text-[#94A3B8] font-light">
                    Licencias activas registradas en la tabla <code className="text-[#00E5FF]">software_licenses</code>.
                  </p>
                </div>
                <button
                  onClick={fetchAdminLicenses}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-white transition-all cursor-pointer"
                >
                  Actualizar Lista
                </button>
              </div>

              {licensesError && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold mb-4">
                  {licensesError}
                </div>
              )}

              {isLoadingLicenses ? (
                <div className="p-12 text-center text-xs font-mono text-[#94A3B8]">
                  <span className="inline-block w-4 h-4 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin mr-2" />
                  Cargando licencias de software desde Supabase...
                </div>
              ) : adminLicenses.length === 0 ? (
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center text-xs text-[#94A3B8]">
                  No hay licencias emitidas en la base de datos central.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/[0.08] text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">
                        <th className="py-3 px-4">Clave de Licencia</th>
                        <th className="py-3 px-4">Usuario Asignado</th>
                        <th className="py-3 px-4">Software</th>
                        <th className="py-3 px-4">Activaciones</th>
                        <th className="py-3 px-4">Estado</th>
                        <th className="py-3 px-4">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {adminLicenses.map((lic) => (
                        <tr key={lic.id} className="hover:bg-white/[0.02]">
                          <td className="py-4 px-4 font-mono text-[#00E5FF] font-bold">
                            {lic.license_key}
                          </td>
                          <td className="py-4 px-4 text-[#94A3B8]">
                            <div className="text-white font-bold">{lic.global_users?.email || lic.user_id}</div>
                            <div className="text-[9px] font-mono text-[#64748B]">{lic.user_id}</div>
                          </td>
                          <td className="py-4 px-4 text-white">
                            <span className="font-bold uppercase">{lic.product_id}</span>
                            <span className="text-[10px] text-[#94A3B8] font-mono ml-2 uppercase">({lic.tier})</span>
                          </td>
                          <td className="py-4 px-4 font-mono text-white">
                            {lic.current_activations} / {lic.max_activations} dispositivos
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                lic.status === "active"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                              }`}
                            >
                              {lic.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            {lic.status === "active" && (
                              <button
                                onClick={() => handleRevokeLicense(lic.id, lic.license_key)}
                                className="px-3 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-bold cursor-pointer transition-all"
                              >
                                Revocar
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal: Editar Usuario Completo (Nombre, Email, Contraseña, Rol) */}
        {selectedUserForEdit && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#0B0B10] border border-white/15 shadow-[0_20px_70px_rgba(0,0,0,0.95)] relative animate-fade-in">
              <button
                onClick={() => setSelectedUserForEdit(null)}
                className="absolute top-5 right-5 text-white/50 hover:text-white text-lg font-bold"
              >
                &times;
              </button>

              <div className="flex items-center gap-2 text-[10px] font-black text-[#00E5FF] uppercase tracking-widest mb-1">
                <span>EDICIÓN DIRECTA EN SUPABASE</span>
              </div>
              <h3 className="text-xl font-black text-white font-sans mb-1">
                Editar Cuenta de Usuario
              </h3>
              <p className="text-xs text-[#94A3B8] font-light mb-6">
                Modificar credenciales, nombre y privilegios de <strong className="text-white">{selectedUserForEdit.email}</strong>.
              </p>

              <form onSubmit={handleSaveUserEdit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={editUserName}
                    onChange={(e) => setEditUserName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={editUserEmail}
                    onChange={(e) => setEditUserEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                    Empresa / Organización
                  </label>
                  <input
                    type="text"
                    value={editUserCompany}
                    onChange={(e) => setEditUserCompany(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                      Rol Global
                    </label>
                    <select
                      value={editUserRole}
                      onChange={(e) => setEditUserRole(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-[#00E5FF]"
                    >
                      <option value="user" className="bg-[#050507]">Usuario Estándar</option>
                      <option value="admin" className="bg-[#050507]">Administrador</option>
                      <option value="superadmin" className="bg-[#050507]">SuperAdmin (Dueño)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                      Nueva Contraseña (Opcional)
                    </label>
                    <input
                      type="password"
                      placeholder="Dejar vacía para no cambiar"
                      value={editUserNewPassword}
                      onChange={(e) => setEditUserNewPassword(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-[#00E5FF]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedUserForEdit(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-bold transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.35)] transition-transform hover:scale-105"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Otorgar Beneficio / Cambiar Plan */}
        {selectedUserForPerk && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#0B0B10] border border-[#00E5FF]/40 shadow-[0_20px_70px_rgba(0,229,255,0.25)] relative animate-fade-in">
              <button
                onClick={() => setSelectedUserForPerk(null)}
                className="absolute top-5 right-5 text-white/50 hover:text-white text-lg font-bold"
              >
                &times;
              </button>

              <div className="flex items-center gap-2 text-[10px] font-black text-[#00E5FF] uppercase tracking-widest mb-1">
                <span>GESTIÓN DE ENTITLEMENTS & PLANES</span>
              </div>
              <h3 className="text-xl font-black text-white font-sans mb-1">
                Asignar Plan o Rol Satélite
              </h3>
              <p className="text-xs text-[#94A3B8] font-light mb-6">
                Configurar plan, rol o beneficio para <strong className="text-white">{selectedUserForPerk.email}</strong> en Supabase.
              </p>

              <form onSubmit={handleApplyGrant} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1.5">
                    Seleccionar Producto del Ecosistema
                  </label>
                  <select
                    value={selectedProductForGrant}
                    onChange={(e) => setSelectedProductForGrant(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-[#00E5FF]"
                  >
                    <option value="access" className="bg-[#050507]">Moderno Access (Control de Acceso & Consorcios)</option>
                    <option value="cloud" className="bg-[#050507]">Moderno Cloud (Almacenamiento & Bóvedas)</option>
                    <option value="play" className="bg-[#050507]">Moderno Play (Cloud Gaming & Emulación)</option>
                    <option value="one" className="bg-[#050507]">Moderno One (ERP Modular)</option>
                    <option value="ai" className="bg-[#050507]">Moderno AI (Modelos & Agentes)</option>
                    <option value="cleaner" className="bg-[#050507]">Moderno AI Cleaner Pro (Licencias macOS)</option>
                    <option value="cinema" className="bg-[#050507]">Cinema Studio AI (Generación 4K)</option>
                    <option value="crm" className="bg-[#050507]">Moderno CRM (WaTicket WhatsApp API)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1.5">
                    Nivel de Acceso / Plan a Otorgar
                  </label>
                  <select
                    value={selectedTierForGrant}
                    onChange={(e) => setSelectedTierForGrant(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-[#00E5FF]"
                  >
                    <option value="free" className="bg-[#050507]">Capa Gratuita (Free Tier)</option>
                    <option value="vip" className="bg-[#050507]">VIP Pass (Acceso 4K 60FPS / Privilegiado)</option>
                    <option value="pro" className="bg-[#050507]">Plan Pro Studio (Máxima cuota / Multi-usuario)</option>
                    <option value="family" className="bg-[#050507]">Plan Family 2 TB (Bóveda compartida)</option>
                    <option value="enterprise" className="bg-[#050507]">Plan Enterprise Ilimitado (Consorcios / Empresas)</option>
                    <option value="reseller" className="bg-[#050507]">Cuenta Reseller / Distribuidor Autorizado</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1.5">
                    Motivo / Nota del Beneficio
                  </label>
                  <input
                    type="text"
                    value={grantNote}
                    onChange={(e) => setGrantNote(e.target.value)}
                    placeholder="Ej. Cortesía SuperAdmin, Licencia Reseller, Consorcio Torre 1"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedUserForPerk(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-bold transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.35)] transition-transform hover:scale-105"
                  >
                    Guardar en Supabase
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Dar de Alta Usuario */}
        {showNewUserModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#0B0B10] border border-white/15 shadow-[0_20px_70px_rgba(0,0,0,0.9)] relative animate-fade-in">
              <button
                onClick={() => setShowNewUserModal(false)}
                className="absolute top-5 right-5 text-white/50 hover:text-white text-lg font-bold"
              >
                &times;
              </button>

              <div className="flex items-center gap-2 text-[10px] font-black text-[#00E5FF] uppercase tracking-widest mb-1">
                <span>NUEVA CUENTA GLOBAL</span>
              </div>
              <h3 className="text-xl font-black text-white font-sans mb-1">
                Dar de Alta Usuario
              </h3>
              <p className="text-xs text-[#94A3B8] font-light mb-6">
                Crea una cuenta en Supabase Central con acceso y credenciales iniciales.
              </p>

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                    Correo Electrónico (Obligatorio)
                  </label>
                  <input
                    type="email"
                    required
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="usuario@empresa.com.ar"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="Ej. Roberto Benítez"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                    Contraseña Inicial
                  </label>
                  <input
                    type="password"
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres (requerida)"
                    required
                    minLength={8}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                    Empresa / Organización
                  </label>
                  <input
                    type="text"
                    value={newUserCompany}
                    onChange={(e) => setNewUserCompany(e.target.value)}
                    placeholder="Ej. Consorcio Los Pinos o Particular"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                      Producto Inicial
                    </label>
                    <select
                      value={newUserInitialProduct}
                      onChange={(e) => setNewUserInitialProduct(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-[#00E5FF]"
                    >
                      <option value="access" className="bg-[#050507]">Moderno Access</option>
                      <option value="cloud" className="bg-[#050507]">Moderno Cloud</option>
                      <option value="play" className="bg-[#050507]">Moderno Play</option>
                      <option value="one" className="bg-[#050507]">Moderno One</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                      Tier Asignado
                    </label>
                    <select
                      value={newUserInitialTier}
                      onChange={(e) => setNewUserInitialTier(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-[#00E5FF]"
                    >
                      <option value="pro" className="bg-[#050507]">Plan Pro</option>
                      <option value="vip" className="bg-[#050507]">VIP Pass</option>
                      <option value="family" className="bg-[#050507]">Plan Family</option>
                      <option value="enterprise" className="bg-[#050507]">Enterprise</option>
                      <option value="reseller" className="bg-[#050507]">Reseller</option>
                      <option value="free" className="bg-[#050507]">Free Tier</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNewUserModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-bold transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.35)] transition-transform hover:scale-105"
                  >
                    Crear y Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
