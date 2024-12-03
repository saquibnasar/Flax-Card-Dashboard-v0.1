"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { RiUpload2Line, RiUserLine } from "react-icons/ri";
import z from "zod";
import CroppedImage from "../components/CroppedImage";
import ErrorMessage from "../components/ErrorMessage";
import {
  checkEmployeeId,
  checkMemberProfile,
  checkPrimaryCard,
} from "../services/api-client";
import useUserDetailsStore from "../stores/useUserDetailsStore";
import {
  PrimaryCardSchema,
  SecondaryCardSchema,
  UserFormSchema,
} from "../validation";
import CategorySelector from "./CategorySelector";
import FormContainer from "./FormContainer";
import Submit from "./Submit";
import { getCookie } from "cookies-next";
import { useDebounce } from "../utils/hooks/useDebounce";
import _ from "lodash";

type createUserForm = z.infer<typeof PrimaryCardSchema>;

const UserForm = () => {
  const router = useRouter();
  const categories = [
    "Individual",
    "Business",
    "Education",
    "Government",
    "Non-Profit",
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [userUrlExist, setUserUrlExist] = useState(false);
  const {
    name,
    designation,
    employeeId,
    profileUrl,
    profileImage,
    employeeBio,
    companyName,
    setCompanyName,
    setProfileImage,
    setName,
    setDesignation,
    setEmployeeId,
    setProfileUrl,
    setBio,
  } = useUserDetailsStore();
  const [cardCreated, setCardCreated] = useState(true);
  const [isEmployeeExist, setIsEmployeeExist] = useState(false);
  const [isMemberExist, setIsMemberExist] = useState(false);
  const [memberEmployee, setMemberEmployee] = useState("");
  const [memberProfileUrl, setMemberProfileUrl] = useState("");
  const profileDebouncedValue = useDebounce(memberProfileUrl);
  const employeeIdDebouncedValue = useDebounce(memberEmployee);

  useEffect(() => {
    const fetchData = async () => {
      await checkMemberProfile(memberProfileUrl).then((response) =>
        setIsMemberExist(response)
      );
    };
    if (profileDebouncedValue) {
      fetchData();
    }
  }, [profileDebouncedValue]);
  useEffect(() => {
    const fetchData = async () => {
      await checkEmployeeId(memberEmployee).then((response) =>
        setIsEmployeeExist(response)
      );
    };
    if (employeeIdDebouncedValue) {
      fetchData();
    }
  }, [employeeIdDebouncedValue]);

  const token = getCookie("accessToken");
  useEffect(() => {
    const isCardCreated = async () => {
      try {
        await checkPrimaryCard(token!).then((response) =>
          setCardCreated(response)
        );
      } catch (ex) {}
    };

    isCardCreated();
  }, []);

  const validationSchema = useMemo(() => {
    return cardCreated ? SecondaryCardSchema : PrimaryCardSchema;
  }, [cardCreated]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserForm>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!userUrlExist) router.push(`/new?tab=linkForm`);
  });

  const imageUrl = useMemo(
    () => (profileImage ? URL.createObjectURL(profileImage) : null),
    [profileImage]
  );

  return (
    <FormContainer
      title="Let's Get Started"
      subtitle="We want to know about you better"
    >
      <form
        className="flex h-full md:h-[75vh] flex-col justify-between"
        onSubmit={onSubmit}
      >
        <div className="h-full overflow-y-scroll">
          <div className="flex items-center space-x-5">
            {profileImage ? (
              <Image
                className="rounded-full"
                width={88}
                height={88}
                src={imageUrl!}
                alt="user profile"
              />
            ) : (
              <span className="text-tSecondary flex justify-center items-center text-4xl w-[88px] h-[88px] p-2 border-tSecondary border-2 rounded-full bg-sSecondary">
                <RiUserLine />
              </span>
            )}
            <div className="flex flex-col h-full justify-center mb-5">
              <p className="mb-3">Profile Picture</p>
              <CroppedImage
                name="profileImage"
                aspectRatio={1}
                setFile={(file) => setProfileImage(file)}
              >
                <div className="px-8 py-3 text-tSecondary border border-dSecondary rounded-md flex items-center space-x-2 hover:text-black transition-all ease-linear duration-150">
                  <span className="mr-2">
                    <RiUpload2Line />
                  </span>
                  Upload Image
                </div>
              </CroppedImage>
            </div>
          </div>
          {/* <p className="pl-2 text-tSecondary text-sm">
            Select one category that best describes your Flax Card
          </p>
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          /> */}

          <div className="p-2 space-y-5">
            <div className="form-control">
              <label className="label-text p-1">
                Name <span className="text-sm align-top text-aRed">*</span>
              </label>
              <input
                {...register("name")}
                defaultValue={name}
                type="text"
                className="input input-bordered"
                onChange={(event) => setName(event.currentTarget.value)}
              />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </div>

            <div className="form-control">
              <label className="label-text p-1">Job Title</label>
              <input
                {...register("jobTitle")}
                defaultValue={designation}
                type="text"
                onChange={(event) => setDesignation(event.currentTarget.value)}
                className="input input-bordered"
              />
              <ErrorMessage>{errors.jobTitle?.message}</ErrorMessage>
            </div>

            {!cardCreated && (
              <div className="form-control">
                <label className="label-text p-1">Company Name </label>
                <input
                  {...register("companyName")}
                  defaultValue={companyName}
                  type="text"
                  onChange={(event) =>
                    setCompanyName(event.currentTarget.value)
                  }
                  className="input input-bordered"
                />
                <ErrorMessage>{errors.companyName?.message}</ErrorMessage>
              </div>
            )}

            {cardCreated && (
              <>
                {" "}
                <div className="form-control">
                  <label className="label-text p-1">
                    Employee Id{" "}
                    <span className="text-sm align-top text-aRed">*</span>
                  </label>
                  <input
                    {...register("employeeId")}
                    defaultValue={employeeId}
                    type="text"
                    value={employeeId}
                    onChange={(event) => {
                      const inputValue = event.currentTarget.value;
                      const sanitizedValue = inputValue.replace(
                        /[^a-zA-Z0-9_]/g,
                        ""
                      );

                      setEmployeeId(sanitizedValue);
                      setMemberEmployee(sanitizedValue);
                    }}
                    className="input input-bordered"
                  />
                  <ErrorMessage>
                    {errors.employeeId?.message ||
                      (isEmployeeExist && "Employee Id already exists")}
                  </ErrorMessage>
                </div>
                <div className="form-control">
                  <label className="label-text p-1">
                    Profile Url{" "}
                    <span className="text-sm align-top text-aRed">*</span>
                  </label>
                  <label className="input-group w-100">
                    <span>{`flax.bio/${window.localStorage.getItem(
                      "username"
                    )}/`}</span>
                    <input
                      {...register("profileUrl")}
                      defaultValue={profileUrl}
                      type="text"
                      onChange={(event) => {
                        setMemberProfileUrl(event.target.value);
                        setProfileUrl(event.target.value);
                      }}
                      className="input input-bordered w-full"
                    />
                  </label>

                  <ErrorMessage>
                    {errors.profileUrl?.message ||
                      (isMemberExist && "Member already exists")}
                  </ErrorMessage>
                </div>
              </>
            )}

            <div className="form-control md:col-span-2">
              <div className="flex justify-between items-center">
                <label className="label-text p-1">{`About yourself`}</label>
                <p
                  className={`text-xs text-${
                    employeeBio.length > 150 ? "aRed" : "tSecondary"
                  }`}
                >{`${employeeBio.length}/150`}</p>
              </div>
              <textarea
                {...register("bio")}
                defaultValue={employeeBio}
                onChange={(event) => setBio(event.currentTarget.value)}
                className="textarea textarea-bordered w-full"
              />
              <ErrorMessage>{errors.bio?.message}</ErrorMessage>
            </div>
          </div>
        </div>
        <div className="h-full md:h-[10vh] overflow-y-hidden">
          <Submit
            disable={isEmployeeExist || isMemberExist}
            previous=""
            next="linkForm"
          />
        </div>
      </form>
    </FormContainer>
  );
};

export default UserForm;
