"use client"
import React, { useState } from 'react';
import styles from '../page.module.css';
import Image from 'next/image';
import {
    Box,
    Container,
    Heading,
    Stack,
    FormControl,
    FormLabel,
    Text,
    Input,
    Textarea,
    Button,
    HStack,
    InputLeftAddon,
    InputGroup,
    Radio,
    RadioGroup,
    useToast, // Import useToast hook from Chakra UI
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '@/utilis/ValidationSchema';
import { useFetchCampaignForm } from '@/hooks/useCampagianForm';
import Loader from './Loader';

interface FormValues {
    name: string;
    email: string;
    phone: string;
    instagram: string;
    tiktok: string;
    twitter: string;
    custom_field_1: string;
    custom_field_2?: string;
    custom_field_3: boolean;
}

const FormComponent = () => {
    const [submitting, setSubmitting] = useState(false);
    const campaignId = '12345';
    const { data } = useFetchCampaignForm(campaignId);
    const { handleSubmit, register, reset, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const toast = useToast(); // Initialize useToast hook

    if (!data) {
        return <Loader />
    }

    const { default_fields, socials, custom_fields } = data;

    const renderFieldInput = (field: any) => {
        switch (field.type) {
            case "longtext":
                return <Textarea placeholder="Your answer" {...register(field.name as keyof FormValues)} />;
            case "shortext":
                return <Input placeholder="Your answer" {...register(field.name as keyof FormValues)} />;
            case "boolean":
                return (
                    <RadioGroup defaultValue={field.default_value || "yes"}>
                        <HStack spacing={4}>
                            <Radio size="sm" value="true" id={`${field.name}-yes`} {...register(field.name as keyof FormValues)} />
                            <FormLabel htmlFor={`${field.name}-yes`}>Yes</FormLabel>
                            <Radio size="sm" value="false" id={`${field.name}-no`} {...register(field.name as keyof FormValues)} />
                            <FormLabel htmlFor={`${field.name}-no`}>No</FormLabel>
                        </HStack>
                    </RadioGroup>
                );

            default:
                return null;
        }
    };

    const onSubmit = (formData: FormValues) => {
        console.log(formData);
        setSubmitting(true);


        setTimeout(() => {
            setSubmitting(false);
            reset();


            toast({
                title: "Form Submitted",
                description: "Your application has been submitted successfully!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
        }, 1000);
    };

    return (
        <section className={styles.main}>
            <div>
                <Heading as='h1' size='xl' sx={{ fontFamily: 'sans-serif' }}>
                    Become an Influencer For
                </Heading>
                <Heading as='h1' size='xl' sx={{ fontFamily: 'sans-serif' }}>
                    <span className={styles.span}>
                        Breakaway x Mifu
                    </span>
                </Heading>
            </div>

            <Stack spacing={3} align="center" maxW="1200px" mx="auto" my={6}>
                <Text fontSize='sm' textAlign='center' maxW="600px">
                    Whether you&apos;re the person with the most likes or followers on campus, or a hard-worker looking to build your network and gain marketing experience, we want to HEAR from you.
                </Text>
                <Text fontSize='sm' textAlign='center' maxW="600px">
                    Becoming a part of the Breakaway Influencer and Ambassador team is pretty simple. Just apply by selecting your preferred market below. Complete your application and attach your Instagram handle for a chance to be considered.
                </Text>
            </Stack>

            <Container maxW="600px" my={8}>
                <Box p={6} borderRadius="md" boxShadow="xl">
                    <Text fontSize="md" mb={4}>Apply Now</Text>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={4}>

                            {default_fields.map((field: any) => (
                                <FormControl key={field} isRequired>
                                    <FormLabel>{capitalizeFirstLetter(field)}</FormLabel>
                                    <Input
                                        type={field === 'phone' ? 'number' : 'text'}
                                        placeholder={`Enter ${field}`}
                                        color="black"
                                        _placeholder={{ color: "black", fontSize: "14px" }}
                                        {...register(field)}
                                    />
                                    {errors?.[field as keyof FormValues]?.message && (
                                        <Text color="red" fontSize="sm">
                                            {errors?.[field as keyof FormValues]?.message}
                                        </Text>
                                    )}
                                </FormControl>
                            ))}

                            <Text fontSize="md" mb={4}>Your Socials</Text>

                            {socials.map((social: string) => (
                                <HStack key={social} spacing={4} alignItems="center">
                                    <Image
                                        width={50}
                                        height={50}
                                        objectFit="cover"
                                        src={`/images/${social}.png`}
                                        alt={social}
                                    />
                                    <FormControl >
                                        <InputGroup>
                                            <InputLeftAddon color="black">@</InputLeftAddon>
                                            <Input
                                                placeholder={`${social} Username`}
                                                {...register(social as keyof FormValues)}
                                            />
                                            {errors?.[social as keyof FormValues]?.message && (
                                                <Text color="red" fontSize="sm">
                                                    {errors?.[social as keyof FormValues]?.message}
                                                </Text>
                                            )}

                                        </InputGroup>
                                    </FormControl>
                                </HStack>
                            ))}

                            {custom_fields.map((field: any) => (
                                <FormControl key={field.name} isRequired={field.is_required}>
                                    <FormLabel>{field.question}</FormLabel>
                                    {renderFieldInput(field)}
                                    {errors?.[field as keyof FormValues]?.message && (
                                        <Text color="red" fontSize="sm">
                                            {errors?.[field as keyof FormValues]?.message}
                                        </Text>
                                    )}
                                    {errors?.[field as keyof FormValues]?.message && (
                                        <Text color="red" fontSize="sm">
                                            {errors?.[field as keyof FormValues]?.message}
                                        </Text>
                                    )}

                                </FormControl>
                            ))}

                            <Button colorScheme="blue" type="submit">
                                {submitting ? "Submitting..." : "Submit"}
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Container>
        </section>
    );
};

export default FormComponent;

function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
