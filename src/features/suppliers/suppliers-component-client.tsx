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

const mockBankNames = [
  { value: "ghana_commercial_bank", label: "Ghana Commercial Bank" },
  { value: "stanbic_bank", label: "Stanbic Bank" },
  { value: "ecobank", label: "Ecobank" },
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

const mockPaymentTerms = [
  { value: "net_30", label: "Net 30 Days" },
  { value: "net_60", label: "Net 60 Days" },
  { value: "cash_on_delivery", label: "Cash on Delivery" },
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
          name="name" // Matches AddSupplier type
          label="Supplier name" // Matches UI
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
          name="brandTradeName" // Matches AddSupplier type
          label="Brand/Trade name" // Matches UI
          renderInput={({ field }) => (
            <Input
              {...field}
              className="focus-visible:ring-ims-blue-300 bg-white"
              placeholder="Eg. paracetamol"
            />
          )}
        />
        <HookFormField
          formControl={control}
          name="supplierType" // Matches AddSupplier type
          label="Supplier Type" // Matches UI
          renderInput={({ field }) => (
            <ImsSelect
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
            name="department" // Matches AddSupplier type
            label="Department" // Matches UI
            renderInput={({ field }) => (
              <Input
                {...field}
                className="focus-visible:ring-ims-blue-300 bg-white"
                placeholder="Enter department"
              />
            )}
          />
        </div>
        <HookFormField
          formControl={control}
          name="phoneNumber" // Matches AddSupplier type
          label="Phone number" // Matches UI
          renderInput={({ field }) => (
            <Input
              {...field}
              type="tel" // Use tel type for phone numbers
              className="focus-visible:ring-ims-blue-300 bg-white"
              placeholder="555 553 8672"
            />
          )}
        />
        <HookFormField
          formControl={control}
          name="email" // Matches AddSupplier type
          label="Email" // Matches UI
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
        <HookFormField
          formControl={control}
          name="mailingAddress" // Matches AddSupplier type
          label="Mailing Address" // Matches UI
          renderInput={({ field }) => (
            <Input
              {...field}
              className="focus-visible:ring-ims-blue-300 bg-white"
              placeholder="Enter address"
            />
          )}
        />
        {/* Emergency Contact fields - Optional based on type */}
        <HookFormField
          formControl={control}
          name="emergencyContactName" // Matches AddSupplier type
          label="Emergency Contact name" // Matches UI
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
          name="emergencyContactTitle" // Matches AddSupplier type
          label="Emergency Contact Title" // Added label based on type
          renderInput={({ field }) => (
            <Input
              {...field}
              className="focus-visible:ring-ims-blue-300 bg-white"
              placeholder="Eg: Manager" // Example placeholder
            />
          )}
        />
        <HookFormField
          formControl={control}
          name="emergencyContactNumber" // Matches AddSupplier type
          label="Emergency Contact Number" // Added label based on type
          renderInput={({ field }) => (
            <Input
              {...field}
              type="tel" // Use tel type for phone numbers
              className="focus-visible:ring-ims-blue-300 bg-white"
              placeholder="555 553 8672"
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
