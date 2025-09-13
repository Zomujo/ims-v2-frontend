import { Control } from "react-hook-form";
import HookFormField, {
  inputTypeNumber,
  MultiStep,
} from "../shared/components/hook-form-filed";
import { ImsSelect } from "../shared/components/ims-select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

// Mock data for select dropdowns - Based on the AddSupplier type and UI
const mockSupplierTypes = [
  { value: "manufacturer", label: "Manufacturer" }, // Example types
  { value: "distributor", label: "Distributor" },
  { value: "wholesaler", label: "Wholesaler" },
];

const mockLeadTimes = [
  { value: "1-3d", label: "1-3 Days" },
  { value: "5-7d", label: "5-7 Days" },
  { value: "1-2w", label: "1-2 Weeks" },
  { value: "3-4w", label: "3-4 Weeks" },
  { value: "1-2m", label: "1-2 Months" },
  { value: "3-6m", label: "3-6 Months" },
];

const mockDeliveryMethods = [
  { value: "pickup", label: "Pickup" },
  { value: "delivery", label: "Delivery" },
];

const mockPaymentTypes = [
  { value: "Bank", label: "Bank" },
  { value: "Mobile Money", label: "Mobile Money" },
  // { value: 'Cash', label: 'Cash' }, // Removed 'Cash' as it's not in the AddSupplier type union
];

const departmentOptions = [
  { value: "Sales", label: "Sales" },
  { value: "Account Management", label: "Account Management" },
  { value: "Customer Service", label: "Customer Service" },
  { value: "Billing", label: "Billing" },
  { value: "Accounts Receivable", label: "Accounts Receivable" },
  { value: "Shipping", label: "Shipping" },
  { value: "Logistics", label: "Logistics" },
  { value: "Returns", label: "Returns" },
  { value: "Quality Assurance", label: "Quality Assurance" },
  { value: "Compliance", label: "Compliance" },
  { value: "Regulatory Affairs", label: "Regulatory Affairs" },
  { value: "Contracts", label: "Contracts" },
  { value: "Legal", label: "Legal" },
  { value: "Marketing", label: "Marketing" },
  { value: "Technical Support", label: "Technical Support" },
];

const mockBankNames = [
  { value: "ghana_commercial_bank", label: "Ghana Commercial Bank" },
  { value: "stanbic_bank", label: "Stanbic Bank" },
  { value: "ecobank", label: "Ecobank" },
  { value: "absa_bank_ghana", label: "Absa Bank Ghana" },
  { value: "access_bank_ghana", label: "Access Bank (Ghana) PLC" },
  {
    value: "agricultural_development_bank",
    label: "Agricultural Development Bank",
  },
  { value: "bank_of_africa_ghana", label: "Bank of Africa Ghana" },
  { value: "calbank", label: "CalBank PLC" },
  { value: "consolidated_bank_ghana", label: "Consolidated Bank Ghana" },
  { value: "fbnbank_ghana", label: "FBNBank (Ghana) Limited" },
  { value: "fidelity_bank", label: "Fidelity Bank Ghana" },
  { value: "first_atlantic_bank", label: "First Atlantic Bank Limited" },
  {
    value: "first_national_bank_ghana",
    label: "First National Bank (Ghana) Limited",
  },
  { value: "gcb_bank", label: "GCB Bank PLC" },
  {
    value: "guaranty_trust_bank_ghana",
    label: "Guaranty Trust Bank (Ghana) Limited",
  },
  {
    value: "national_investment_bank",
    label: "National Investment Bank Limited",
  },
  { value: "omnibsic_bank", label: "OmniBSIC Bank Ghana Limited" },
  { value: "prudential_bank", label: "Prudential Bank Limited" },
  { value: "republic_bank_ghana", label: "Republic Bank (Ghana) PLC" },
  { value: "societe_generale_ghana", label: "Societe Generale Ghana PLC" },
  {
    value: "standard_chartered_bank_ghana",
    label: "Standard Chartered Bank Ghana PLC",
  },
  {
    value: "united_bank_for_africa_ghana",
    label: "United Bank for Africa (Ghana) Limited",
  },
  {
    value: "universal_merchant_bank",
    label: "Universal Merchant Bank Limited",
  },
  { value: "zenith_bank_ghana", label: "Zenith Bank (Ghana) Limited" },
];

const mockAccountTypes = [
  { value: "savings", label: "Savings" },
  { value: "current", label: "Current" },
  { value: "money_market", label: "Money Market" },
];

const mockCurrencies = [
  { value: "ghs", label: "GHS" },
  { value: "usd", label: "USD" },
  { value: "eur", label: "EUR" },
];

const mockMobileMoneyProviders = [
  { value: "MTN", label: "MTN" },
  { value: "Vodafone", label: "Vodafone" },
  { value: "Airteltigo", label: "Airteltigo" },
];

type SupplierFormInputsProps = {
  control: Control;
  currentStep: number;
  paymentType: string;
};

export const SupplierFormInputs = ({
  control,
  paymentType,
  currentStep,
}: Readonly<SupplierFormInputsProps>) => {
  return (
    <>
      <MultiStep currentStep={currentStep} step={1}>
        <HookFormField
          formControl={control}
          name="name"
          label="Supplier name"
          renderInput={({ field }) => (
            <Input
              {...field}
              className="focus-visible:ring-ims-blue-300 bg-white"
              placeholder="Eg: MDS Pharmaceuticals Ltd."
            />
          )}
        />
        <HookFormField
          formControl={control}
          name="supplierType"
          label="Supplier Type"
          renderInput={({ field }) => (
            <ImsSelect
              showNone={false}
              options={mockSupplierTypes}
              moduleName="option"
              onChange={field.onChange}
              value={field.value}
              className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
            />
          )}
        />
        <HookFormField
          formControl={control}
          name="minimumOrderQuantity" // Matches AddSupplier type
          label="Minimum order qty" // Matches UI
          renderInput={({ field }) => (
            <Input
              type="number"
              className="focus-visible:ring-ims-blue-300 bg-white"
              placeholder="Enter quantity"
              {...inputTypeNumber(field)}
            />
          )}
        />
        <HookFormField
          formControl={control}
          name="leadTime" // Matches AddSupplier type
          label="Lead time" // Matches UI
          renderInput={({ field }) => (
            <ImsSelect
              showNone={false}
              options={mockLeadTimes}
              moduleName="option"
              onChange={field.onChange}
              value={field.value}
              className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
            />
          )}
        />
        <HookFormField
          formControl={control}
          name="deliveryMethod" // Matches AddSupplier type
          label="Delivery Method" // Matches UI
          renderInput={({ field }) => (
            <ImsSelect
              showNone={false}
              options={mockDeliveryMethods}
              moduleName="option"
              onChange={field.onChange}
              value={field.value}
              className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
            />
          )}
        />
      </MultiStep>
      <MultiStep currentStep={currentStep} step={2}>
        <HookFormField
          formControl={control}
          name="primaryContactName" // Matches AddSupplier type
          label="Primary Contact name" // Matches UI
          renderInput={({ field }) => (
            <Input
              {...field}
              className="focus-visible:ring-ims-blue-300 bg-white"
              placeholder="Eg:James Appiah"
            />
          )}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <HookFormField
            formControl={control}
            name="jobTitle" // Matches AddSupplier type
            label="Job Title" // Matches UI
            renderInput={({ field }) => (
              <Input
                {...field}
                className="focus-visible:ring-ims-blue-300 bg-white"
                placeholder="Eg:James Appiah"
              />
            )}
          />
          <HookFormField
            formControl={control}
            name="department"
            label="Department"
            renderInput={({ field }) => (
              <ImsSelect
                showNone={false}
                options={departmentOptions}
                moduleName="department"
                onChange={field.onChange}
                value={field.value}
                className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
              />
            )}
          />
        </div>
        <HookFormField
          formControl={control}
          name="phoneNumber"
          label="Phone number"
          renderInput={({ field }) => (
            <Input
              {...field}
              type="tel"
              className="focus-visible:ring-ims-blue-300 bg-white"
              placeholder="555 553 8672"
            />
          )}
        />
        <HookFormField
          formControl={control}
          name="email"
          label="Email"
          renderInput={({ field }) => (
            <Input
              {...field}
              type="email"
              className="focus-visible:ring-ims-blue-300 bg-white"
              placeholder="Eg. james@gmail.com"
            />
          )}
        />
        <HookFormField
          formControl={control}
          name="physicalAddress" // Matches AddSupplier type
          label="Physical Address" // Matches UI
          renderInput={({ field }) => (
            <Input
              {...field}
              className="focus-visible:ring-ims-blue-300 bg-white"
              placeholder="Enter address"
            />
          )}
        />
      </MultiStep>
      <MultiStep currentStep={currentStep} step={3}>
        <HookFormField
          formControl={control}
          name="paymentType" // Matches AddSupplier type
          label="Payment type" // Matches UI
          renderInput={({ field }) => (
            <ImsSelect
              options={mockPaymentTypes}
              moduleName="option"
              showNone={false}
              onChange={field.onChange}
              value={field.value}
              className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
            />
          )}
        />
        {/* Conditionally render fields based on paymentType */}
        {paymentType === "Bank" && (
          <>
            <HookFormField
              formControl={control}
              name="bankName" // Matches AddSupplier type
              label="Bank name" // Matches UI
              renderInput={({ field }) => (
                <ImsSelect
                  options={mockBankNames}
                  moduleName="option"
                  showNone={false}
                  onChange={field.onChange}
                  value={field.value}
                  className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
                />
              )}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <HookFormField
                formControl={control}
                name="accountType" // Matches AddSupplier type
                label="Account Type" // Matches UI
                renderInput={({ field }) => (
                  <ImsSelect
                    options={mockAccountTypes}
                    moduleName="option"
                    onChange={field.onChange}
                    showNone={false}
                    value={field.value}
                    className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
                  />
                )}
              />
              <HookFormField
                formControl={control}
                name="accountNumber" // Matches AddSupplier type
                label="Account number" // Matches UI
                renderInput={({ field }) => (
                  <Input
                    {...field}
                    className="focus-visible:ring-ims-blue-300 bg-white"
                    placeholder="Enter account number" // Updated placeholder
                  />
                )}
              />
            </div>
          </>
        )}

        {paymentType === "Mobile Money" && (
          <>
            <HookFormField
              formControl={control}
              name="provider" // Matches AddSupplier type
              label="Provider" // Added label based on type
              renderInput={({ field }) => (
                <ImsSelect
                  options={mockMobileMoneyProviders}
                  showNone={false}
                  moduleName="provider"
                  onChange={field.onChange}
                  value={field.value}
                  className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
                />
              )}
            />
            <HookFormField
              formControl={control}
              name="mobileMoneyPhoneNumber" // Matches AddSupplier type
              label="Mobile Money Number" // Added label based on type
              renderInput={({ field }) => (
                <Input
                  {...field}
                  type="tel" // Use tel type
                  className="focus-visible:ring-ims-blue-300 bg-white"
                  placeholder="Enter phone number" // Example placeholder
                />
              )}
            />
          </>
        )}

        <HookFormField
          formControl={control}
          name="currency" // Matches AddSupplier type
          label="Currency" // Matches UI
          renderInput={({ field }) => (
            <ImsSelect
              options={mockCurrencies}
              moduleName="option"
              showNone={false}
              onChange={field.onChange}
              value={field.value}
              className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
            />
          )}
        />
        <HookFormField
          formControl={control}
          name="paymentTerms" // Matches AddSupplier type
          label="Payment Terms" // Matches UI
          renderInput={({ field }) => (
            <Textarea
              {...field}
              className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
            />
          )}
        />
      </MultiStep>
    </>
  );
};
